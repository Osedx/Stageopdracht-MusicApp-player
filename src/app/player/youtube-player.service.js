"use strict";
var core_1 = require('@angular/core');
var browser_1 = require('@angular/platform-browser/src/facade/browser');
var ReplaySubject_1 = require('rxjs/ReplaySubject');
var YoutubePlayerService = (function () {
    function YoutubePlayerService(zone) {
        this.zone = zone;
        this.isFullscreen = false;
        this.defaultSizes = {
            height: 270,
            width: 367
        };
        this.createApi();
    }
    YoutubePlayerService.prototype.createApi = function () {
        var _this = this;
        this.api = new ReplaySubject_1.ReplaySubject(1);
        var onYouTubeIframeAPIReady = function () { _this.api.next(browser_1.window.YT); };
        browser_1.window['onYouTubeIframeAPIReady'] = onYouTubeIframeAPIReady;
    };
    YoutubePlayerService.prototype.loadPlayerApi = function () {
        var doc = browser_1.window.document;
        var playerApiScript = doc.createElement("script");
        playerApiScript.type = "text/javascript";
        playerApiScript.src = "https://www.youtube.com/iframe_api";
        doc.body.appendChild(playerApiScript);
    };
    YoutubePlayerService.prototype.setupPlayer = function (elementId, outputs, sizes, videoId) {
        var _this = this;
        var createPlayer = function () {
            if (browser_1.window.YT.Player) {
                _this.createPlayer(elementId, outputs, sizes, videoId);
            }
        };
        this.api.subscribe(createPlayer);
    };
    YoutubePlayerService.prototype.play = function (player) {
        player.playVideo();
    };
    YoutubePlayerService.prototype.pause = function (player) {
        player.pauseVideo();
    };
    YoutubePlayerService.prototype.playVideo = function (media, player) {
        var id = media.id.videoId ? media.id.videoId : media.id;
        player.loadVideoById(id);
        this.play(player);
    };
    YoutubePlayerService.prototype.isPlaying = function (player) {
        // because YT is not loaded yet 1 is used - YT.PlayerState.PLAYING
        var isPlayerReady = player && player.getPlayerState;
        var playerState = isPlayerReady ? player.getPlayerState() : {};
        var isPlayerPlaying = isPlayerReady
            ? playerState !== YT.PlayerState.ENDED && playerState !== YT.PlayerState.PAUSED
            : false;
        return isPlayerPlaying;
    };
    YoutubePlayerService.prototype.createPlayer = function (elementId, outputs, sizes, videoId) {
        var _this = this;
        var service = this;
        var playerSize = {
            height: sizes.height || this.defaultSizes.height,
            width: sizes.width || this.defaultSizes.width
        };
        return new browser_1.window.YT.Player(elementId, Object.assign({}, playerSize, {
            videoId: videoId || '',
            playerVars: {
                rel: 0,
                autoplay: 0,
                showinfo: 0,
            },
            events: {
                onReady: function (ev) {
                    _this.zone.run(function () { return outputs.ready && outputs.ready.next(ev.target); });
                },
                onStateChange: function (ev) {
                    _this.zone.run(function () { return outputs.change && outputs.change.next(ev); });
                    // this.zone.run(() => onPlayerStateChange(ev));
                }
            }
        }));
        function onPlayerStateChange(event) {
            var state = event.data;
            // play the next song if its not the end of the playlist
            // should add a "repeat" feature
            if (state === YT.PlayerState.ENDED) {
            }
            if (state === YT.PlayerState.PAUSED) {
            }
            if (state === YT.PlayerState.PLAYING) {
            }
            // console.log('state changed', state);
            // dispatch STATE CHANGE
        }
    };
    YoutubePlayerService.prototype.toggleFullScreen = function (player, isFullScreen) {
        var _a = this.defaultSizes, height = _a.height, width = _a.width;
        if (!isFullScreen) {
            height = browser_1.window.innerHeight;
            width = browser_1.window.innerWidth;
        }
        player.setSize(width, height);
        // TODO: dispatch event
    };
    // adpoted from uid
    YoutubePlayerService.prototype.generateUniqueId = function () {
        var len = 7;
        return Math.random().toString(35).substr(2, len);
    };
    YoutubePlayerService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    YoutubePlayerService.ctorParameters = [
        { type: core_1.NgZone, },
    ];
    return YoutubePlayerService;
}());
exports.YoutubePlayerService = YoutubePlayerService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieW91dHViZS1wbGF5ZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInlvdXR1YmUtcGxheWVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLHFCQUFpRCxlQUFlLENBQUMsQ0FBQTtBQUNqRSx3QkFBdUIsOENBQThDLENBQUMsQ0FBQTtBQUN0RSw4QkFBOEIsb0JBRTlCLENBQUMsQ0FGaUQ7QUFhbEQ7SUFTRSw4QkFBcUIsSUFBWTtRQUFaLFNBQUksR0FBSixJQUFJLENBQVE7UUFOekIsaUJBQVksR0FBWSxLQUFLLENBQUM7UUFDOUIsaUJBQVksR0FBRztZQUNuQixNQUFNLEVBQUUsR0FBRztZQUNYLEtBQUssRUFBRSxHQUFHO1NBQ2IsQ0FBQztRQUdBLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBRU8sd0NBQVMsR0FBakI7UUFBQSxpQkFJQztRQUhDLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSw2QkFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2hDLElBQU0sdUJBQXVCLEdBQUcsY0FBUSxLQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxnQkFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFBO1FBQ2xFLGdCQUFNLENBQUMseUJBQXlCLENBQUMsR0FBRyx1QkFBdUIsQ0FBQztJQUM5RCxDQUFDO0lBRUQsNENBQWEsR0FBYjtRQUNFLElBQU0sR0FBRyxHQUFHLGdCQUFNLENBQUMsUUFBUSxDQUFDO1FBQzVCLElBQUksZUFBZSxHQUFHLEdBQUcsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbEQsZUFBZSxDQUFDLElBQUksR0FBRyxpQkFBaUIsQ0FBQztRQUN6QyxlQUFlLENBQUMsR0FBRyxHQUFHLG1DQUFtQyxDQUFDO1FBQzFELEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRCwwQ0FB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QUNYLG1DQUFjLEdBQTZEO1FBQ2xGLEVBQUMsSUFBSSxFQUFFLGFBQU0sR0FBRztLQUNmLENBQUM7SUFDRiwyQkFBQztBQUFELENBQUMsQUExSEQsSUEwSEM7QUExSFksNEJBQW9CLHVCQTBIaEMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHAsIFVSTFNlYXJjaFBhcmFtcywgUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9odHRwJztcbmltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyB3aW5kb3cgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL3NyYy9mYWNhZGUvYnJvd3Nlcic7XG5pbXBvcnQgeyBSZXBsYXlTdWJqZWN0IH0gZnJvbSAncnhqcy9SZXBsYXlTdWJqZWN0J1xuXG5leHBvcnQgaW50ZXJmYWNlIFBsYXllck91dHB1dHMge1xuICByZWFkeT86IEV2ZW50RW1pdHRlcjxZVC5QbGF5ZXI+O1xuICBjaGFuZ2U/OiBFdmVudEVtaXR0ZXI8T2JqZWN0IHwgYW55Pjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQbGF5ZXJTaXplIHtcbiAgaGVpZ2h0PzogbnVtYmVyO1xuICB3aWR0aD86IG51bWJlcjtcbn1cblxuXG5leHBvcnQgY2xhc3MgWW91dHViZVBsYXllclNlcnZpY2Uge1xuICBhcGk6IFJlcGxheVN1YmplY3Q8YW55PjtcblxuICBwcml2YXRlIGlzRnVsbHNjcmVlbjogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIGRlZmF1bHRTaXplcyA9IHtcbiAgICAgIGhlaWdodDogMjcwLFxuICAgICAgd2lkdGg6IDM2N1xuICB9O1xuXG4gIGNvbnN0cnVjdG9yIChwcml2YXRlIHpvbmU6IE5nWm9uZSkge1xuICAgIHRoaXMuY3JlYXRlQXBpKCk7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZUFwaSAoKSB7XG4gICAgdGhpcy5hcGkgPSBuZXcgUmVwbGF5U3ViamVjdCgxKTtcbiAgICBjb25zdCBvbllvdVR1YmVJZnJhbWVBUElSZWFkeSA9ICgpID0+IHsgdGhpcy5hcGkubmV4dCh3aW5kb3cuWVQpIH1cbiAgICB3aW5kb3dbJ29uWW91VHViZUlmcmFtZUFQSVJlYWR5J10gPSBvbllvdVR1YmVJZnJhbWVBUElSZWFkeTtcbiAgfVxuXG4gIGxvYWRQbGF5ZXJBcGkgKCkge1xuICAgIGNvbnN0IGRvYyA9IHdpbmRvdy5kb2N1bWVudDtcbiAgICBsZXQgcGxheWVyQXBpU2NyaXB0ID0gZG9jLmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XG4gICAgcGxheWVyQXBpU2NyaXB0LnR5cGUgPSBcInRleHQvamF2YXNjcmlwdFwiO1xuICAgIHBsYXllckFwaVNjcmlwdC5zcmMgPSBcImh0dHA6Ly93d3cueW91dHViZS5jb20vaWZyYW1lX2FwaVwiO1xuICAgIGRvYy5ib2R5LmFwcGVuZENoaWxkKHBsYXllckFwaVNjcmlwdCk7XG4gIH1cblxuICBzZXR1cFBsYXllciAoZWxlbWVudElkOiBzdHJpbmcsIG91dHB1dHM6IFBsYXllck91dHB1dHMsIHNpemVzOiBQbGF5ZXJTaXplLCB2aWRlb0lkOiBzdHJpbmcpIHtcbiAgICBjb25zdCBjcmVhdGVQbGF5ZXIgPSAoKSA9PiB7XG4gICAgICBpZiAod2luZG93LllULlBsYXllcikge1xuICAgICAgICB0aGlzLmNyZWF0ZVBsYXllcihlbGVtZW50SWQsIG91dHB1dHMsIHNpemVzLCB2aWRlb0lkKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHRoaXMuYXBpLnN1YnNjcmliZShjcmVhdGVQbGF5ZXIpO1xuICB9XG5cbiAgcGxheSAocGxheWVyOiBZVC5QbGF5ZXIpIHtcbiAgICBwbGF5ZXIucGxheVZpZGVvKCk7XG4gIH1cblxuICBwYXVzZSAocGxheWVyOiBZVC5QbGF5ZXIpIHtcbiAgICBwbGF5ZXIucGF1c2VWaWRlbygpO1xuICB9XG5cbiAgcGxheVZpZGVvKG1lZGlhOiBhbnksIHBsYXllcjogWVQuUGxheWVyKSB7XG4gICAgY29uc3QgaWQgPSBtZWRpYS5pZC52aWRlb0lkID8gbWVkaWEuaWQudmlkZW9JZCA6IG1lZGlhLmlkO1xuICAgIHBsYXllci5sb2FkVmlkZW9CeUlkKGlkKTtcbiAgICB0aGlzLnBsYXkocGxheWVyKTtcbiAgfVxuXG4gIGlzUGxheWluZyAocGxheWVyOiBZVC5QbGF5ZXIpIHtcbiAgICAvLyBiZWNhdXNlIFlUIGlzIG5vdCBsb2FkZWQgeWV0IDEgaXMgdXNlZCAtIFlULlBsYXllclN0YXRlLlBMQVlJTkdcbiAgICBjb25zdCBpc1BsYXllclJlYWR5OiBhbnkgPSBwbGF5ZXIgJiYgcGxheWVyLmdldFBsYXllclN0YXRlO1xuICAgIGNvbnN0IHBsYXllclN0YXRlID0gaXNQbGF5ZXJSZWFkeSA/IHBsYXllci5nZXRQbGF5ZXJTdGF0ZSgpIDoge307XG4gICAgY29uc3QgaXNQbGF5ZXJQbGF5aW5nID0gaXNQbGF5ZXJSZWFkeVxuICAgICAgPyBwbGF5ZXJTdGF0ZSAhPT0gWVQuUGxheWVyU3RhdGUuRU5ERUQgJiYgcGxheWVyU3RhdGUgIT09IFlULlBsYXllclN0YXRlLlBBVVNFRFxuICAgICAgOiBmYWxzZTtcbiAgICByZXR1cm4gaXNQbGF5ZXJQbGF5aW5nO1xuICB9XG5cbiAgY3JlYXRlUGxheWVyIChlbGVtZW50SWQ6IHN0cmluZywgb3V0cHV0czogUGxheWVyT3V0cHV0cywgc2l6ZXM6IFBsYXllclNpemUsIHZpZGVvSWQ6IHN0cmluZykge1xuICAgIGNvbnN0IHNlcnZpY2UgPSB0aGlzO1xuICAgIGNvbnN0IHBsYXllclNpemUgPSB7XG4gICAgICBoZWlnaHQ6IHNpemVzLmhlaWdodCB8fCB0aGlzLmRlZmF1bHRTaXplcy5oZWlnaHQsXG4gICAgICB3aWR0aDogc2l6ZXMud2lkdGggfHwgdGhpcy5kZWZhdWx0U2l6ZXMud2lkdGhcbiAgICB9O1xuICAgIHJldHVybiBuZXcgd2luZG93LllULlBsYXllcihlbGVtZW50SWQsIE9iamVjdC5hc3NpZ24oe30sIHBsYXllclNpemUsIHtcbiAgICAgIHZpZGVvSWQ6IHZpZGVvSWQgfHwgJycsXG4gICAgICAvLyBwbGF5ZXJWYXJzOiBwbGF5ZXJWYXJzLFxuICAgICAgZXZlbnRzOiB7XG4gICAgICAgICAgb25SZWFkeTogKGV2OiBhbnkpID0+IHtcbiAgICAgICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4gb3V0cHV0cy5yZWFkeSAmJiBvdXRwdXRzLnJlYWR5Lm5leHQoZXYudGFyZ2V0KSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBvblN0YXRlQ2hhbmdlOiAoZXY6IGFueSkgPT4ge1xuICAgICAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiBvdXRwdXRzLmNoYW5nZSAmJiBvdXRwdXRzLmNoYW5nZS5uZXh0KGV2KSk7XG4gICAgICAgICAgICAvLyB0aGlzLnpvbmUucnVuKCgpID0+IG9uUGxheWVyU3RhdGVDaGFuZ2UoZXYpKTtcbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgfSkpO1xuXG4gICAgZnVuY3Rpb24gb25QbGF5ZXJTdGF0ZUNoYW5nZSAoZXZlbnQ6IGFueSkge1xuICAgICAgY29uc3Qgc3RhdGUgPSBldmVudC5kYXRhO1xuICAgICAgLy8gcGxheSB0aGUgbmV4dCBzb25nIGlmIGl0cyBub3QgdGhlIGVuZCBvZiB0aGUgcGxheWxpc3RcbiAgICAgIC8vIHNob3VsZCBhZGQgYSBcInJlcGVhdFwiIGZlYXR1cmVcbiAgICAgIGlmIChzdGF0ZSA9PT0gWVQuUGxheWVyU3RhdGUuRU5ERUQpIHtcblxuICAgICAgfVxuXG4gICAgICBpZiAoc3RhdGUgPT09IFlULlBsYXllclN0YXRlLlBBVVNFRCkge1xuICAgICAgICAgIC8vIHNlcnZpY2UucGxheWVyU3RhdGUgPSBZVC5QbGF5ZXJTdGF0ZS5QQVVTRUQ7XG4gICAgICB9XG4gICAgICBpZiAoc3RhdGUgPT09IFlULlBsYXllclN0YXRlLlBMQVlJTkcpIHtcbiAgICAgICAgICAvLyBzZXJ2aWNlLnBsYXllclN0YXRlID0gWVQuUGxheWVyU3RhdGUuUExBWUlORztcbiAgICAgIH1cbiAgICAgIC8vIGNvbnNvbGUubG9nKCdzdGF0ZSBjaGFuZ2VkJywgc3RhdGUpO1xuICAgICAgLy8gZGlzcGF0Y2ggU1RBVEUgQ0hBTkdFXG4gICAgfVxuICB9XG5cbiAgdG9nZ2xlRnVsbFNjcmVlbiAocGxheWVyOiBZVC5QbGF5ZXIsIGlzRnVsbFNjcmVlbjogYm9vbGVhbiB8IG51bGwgfCB1bmRlZmluZWQpIHtcbiAgICBsZXQgeyBoZWlnaHQsIHdpZHRoIH0gPSB0aGlzLmRlZmF1bHRTaXplcztcblxuICAgIGlmICghaXNGdWxsU2NyZWVuKSB7XG4gICAgICBoZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgICB3aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgIH1cbiAgICBwbGF5ZXIuc2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KTtcbiAgICAvLyBUT0RPOiBkaXNwYXRjaCBldmVudFxuICB9XG5cbiAgLy8gYWRwb3RlZCBmcm9tIHVpZFxuICBnZW5lcmF0ZVVuaXF1ZUlkICgpIHtcbiAgICBjb25zdCBsZW4gPSA3O1xuICAgIHJldHVybiBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM1KS5zdWJzdHIoMiwgbGVuKTtcbiAgfVxuc3RhdGljIGRlY29yYXRvcnM6IERlY29yYXRvckludm9jYXRpb25bXSA9IFtcbnsgdHlwZTogSW5qZWN0YWJsZSB9LFxuXTtcbi8qKiBAbm9jb2xsYXBzZSAqL1xuc3RhdGljIGN0b3JQYXJhbWV0ZXJzOiAoe3R5cGU6IGFueSwgZGVjb3JhdG9ycz86IERlY29yYXRvckludm9jYXRpb25bXX18bnVsbClbXSA9IFtcbnt0eXBlOiBOZ1pvbmUsIH0sXG5dO1xufVxuXG5pbnRlcmZhY2UgRGVjb3JhdG9ySW52b2NhdGlvbiB7XG4gIHR5cGU6IEZ1bmN0aW9uO1xuICBhcmdzPzogYW55W107XG59XG4iXX0=