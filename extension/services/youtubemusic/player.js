/* globals helpers */

this.player = (function() {
  const SEARCH = "/html/body/ytmusic-app/ytmusic-app-layout/div[3]/ytmusic-search-page/ytmusic-section-list-renderer/div[2]/ytmusic-shelf-renderer[1]/div[1]/ytmusic-responsive-list-item-renderer/div[2]/div[3]/yt-formatted-string[1]";

  class Player extends helpers.Runner {
    async sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    async action_search({ query, thenPlay }) {
      const searchButton = await this.waitForSelector(
        "ytmusic-search-box[role='search'] div[class='search-box style-scope ytmusic-search-box']",
        {
          timeout: 5000,
        }
      );
      searchButton.click();

      const input = await this.waitForSelector(
        "div[class='search-box style-scope ytmusic-search-box'] input#input[role='combobox']",
        {
          timeout: 5000,
        }
      );

      this.setReactInputValue(input, query);
      input.value = query;

      let event = document.createEvent("KeyboardEvent"); // create a key event
      // define the event
      event.initKeyEvent(
        "keypress",
        true,
        true,
        null,
        false,
        false,
        false,
        false,
        13,
        0
      );

      input.dispatchEvent(event);
      if (thenPlay) {
        try {
          let path;
          let channel = null;
           channel = await this.waitForEvaluator(
            SEARCH,
            {
              timeout : 10000
            }
          );   
          console.log(channel.innerText);
          if(channel){
            if(channel.innerText != "Artist"){
              path =
             "/html/body/ytmusic-app/ytmusic-app-layout/div[3]/ytmusic-search-page/ytmusic-section-list-renderer/div[2]/ytmusic-shelf-renderer[1]/div[1]/ytmusic-responsive-list-item-renderer/div[1]/ytmusic-item-thumbnail-overlay-renderer/div/ytmusic-play-button-renderer/div/yt-icon";
            
           }else{ 
             let channelPath = "/html/body/ytmusic-app/ytmusic-app-layout/div[3]/ytmusic-search-page/ytmusic-section-list-renderer/div[2]/ytmusic-shelf-renderer[1]/div[1]/ytmusic-responsive-list-item-renderer/a";
             const channelPage = await this.waitForEvaluator(
               channelPath,
               {
                 timeout : 5000
               }
             );            
             
             channelPage.click();
 
              path =
               "/html/body/ytmusic-app/ytmusic-app-layout/div[3]/ytmusic-browse-response/ytmusic-section-list-renderer/div[2]/ytmusic-shelf-renderer/div[1]/ytmusic-responsive-list-item-renderer[1]/div[1]/ytmusic-item-thumbnail-overlay-renderer/div/ytmusic-play-button-renderer/div/yt-icon";
           }
           const playerButton = await this.waitForEvaluator(
             path,
             {
               timeout : 5000
             }
           );
           playerButton.click();
          }else{
            console.log("no channel")
          }   
         
        } catch (e) {
          let path =
            "/html/body/ytmusic-app/ytmusic-app-layout/div[3]/ytmusic-search-page/ytmusic-section-list-renderer/div[2]/ytmusic-item-section-renderer/div[2]/ytmusic-message-renderer/yt-formatted-string[1]";
            const notFound = await this.waitForEvaluator(
              path,
              {
                timeout : 5000
              }
            );  

          if (notFound) {
            if (notFound.innerText.includes("No results found")) {
              throw new Error("No search results");
            }
          } else {
            throw new Error("Timeout during search");
          }
        }
      }
    }

    isPaused() {
      const path = "ytmusic-player#player video";
      const video = this.querySelector(path);
      return video.paused;
    }

    action_play() {
      if (!this.isPaused()) {
        log.info("Attempting to play a video that is already playing");
        return;
      }
      const button = this.querySelector(
        "paper-icon-button#play-pause-button[aria-label='Play']"
      );
      button.click();
    }

    action_pause() {
      if (this.isPaused()) {
        log.info("Attempting to pause a video that is already paused");
        return;
      }
      const button = this.querySelector(
        "paper-icon-button#play-pause-button[aria-label='Pause']"
      );
      button.click();
    }

    action_unpause() {
      this.action_play();
    }

    async action_move({ direction }) {
      if (direction === "next") {
        const selector = "paper-icon-button.next-button";
        const button = this.querySelector(selector);
        button.click();
      } else if (direction === "previous") {
        const selector = "paper-icon-button.previous-button";
        // Player time
        const time = this.querySelector("#progressContainer").innerHTML;
        if (
          /\b0:00\b/gi.test(time) ||
          /\b0:01\b/gi.test(time) ||
          /\b0:02\b/gi.test(time)
        ) {
          const firstClickBtn = this.querySelector(selector);
          firstClickBtn.click();
          return;
        }
        const firstClickBtn = this.querySelector(selector);
        firstClickBtn.click();
        // Since after the first click there is a delay in the selector
        const secondClickBtn = await this.waitForSelector(selector);
        secondClickBtn.click();
      }
    }
  }

  Player.register();
})();
