import { Component, ViewEncapsulation, ViewChild, ElementRef, PipeTransform, Pipe, OnInit } from '@angular/core';
declare var AgoraRTC: any;
import { DomSanitizer } from "@angular/platform-browser";
declare var $;
@Component({
  selector: 'app-video-dialog',
  templateUrl: './video-dialog.component.html',
  styleUrls: ['./video-dialog.component.css']
})
export class VideoDialogComponent implements OnInit {
  client;
  localStream;
  camera;
  microphone;

  audioDevices = [];
  videoDevices = [];

  subscribers = [];
  constructor() {
    this.getDevices();
  }

  ngOnInit() {
    this.join();
  }

  getDevices() {
    AgoraRTC.getDevices((devices) => {
      for (var i = 0; i !== devices.length; ++i) {
        var device = devices[i];
        var option = document.createElement('option');
        option.value = device.deviceId;
        if (device.kind === 'audioinput') {
          option.text = device.label || 'microphone ' + (this.audioDevices.length + 1);
          this.audioDevices.push(option)
        } else if (device.kind === 'videoinput') {
          option.text = device.label || 'camera ' + (this.videoDevices.length + 1);
          this.videoDevices.push(option)
        } else {
          console.log('Some other kind of source/device: ', device);
        }
      }
    });
  }

  join() {
    var channel_key = null;
    console.log("Init AgoraRTC client with vendor key: " + "89348990c9bd463c8680d8d462250cc9");
    this.client = AgoraRTC.createClient({ mode: 'interop' });
    this.client.init("89348990c9bd463c8680d8d462250cc9", () => {
      console.log("AgoraRTC client initialized");
      this.client.join(channel_key, '1000', null, (uid) => {
        console.log("User " + uid + " join channel successfully");

        this.camera = this.videoDevices[0].label;
        this.microphone = this.audioDevices[0].label;
        this.localStream = AgoraRTC.createStream({ streamID: uid, audio: true, cameraId: this.camera, microphoneId: this.microphone, video: true, screen: false });
        //localStream = AgoraRTC.createStream({streamID: uid, audio: false, cameraId: camera, microphoneId: microphone, video: false, screen: true, extensionId: 'minllpmhdgpndnkomcoccfekfegnlikg'});
        this.localStream.setVideoProfile('720p_3');

        // The user has granted access to the camera and mic.
        this.localStream.on("accessAllowed", function () {
          console.log("accessAllowed");
        });

        // The user has denied access to the camera and mic.
        this.localStream.on("accessDenied", function () {
          console.log("accessDenied");
        });

        this.localStream.init(function () {
          console.log("getUserMedia successfully");
          this.localStream.play('agora_local');

          this.client.publish(this.localStream, function (err) {
            console.log("Publish local stream error: " + err);
          });

          this.client.on('stream-published', function (evt) {
            console.log("Publish local stream successfully");
          });
        }, function (err) {
          console.log("getUserMedia failed", err);
        });
      }, function (err) {
        console.log("Join channel failed", err);
      });
    }, function (err) {
      console.log("AgoraRTC client init failed", err);
    });

    var channelKey = "";
    this.client.on('error', (err) => {
      console.log("Got error msg:", err.reason);
      if (err.reason === 'DYNAMIC_KEY_TIMEOUT') {
        this.client.renewChannelKey(channelKey, function () {
          console.log("Renew channel key successfully");
        }, function (err) {
          console.log("Renew channel key failed: ", err);
        });
      }
    });


    this.client.on('stream-added', (evt) => {
      var stream = evt.stream;
      console.log("New stream added: " + stream.getId());
      console.log("Subscribe ", stream);
      this.client.subscribe(stream, function (err) {
        console.log("Subscribe stream failed", err);
      });
    });

    this.client.on('stream-subscribed', (evt) => {
      var stream = evt.stream;
      this.subscribers.push({
        id: 'agora_remote' + stream.getId(),
      })
      console.log("Subscribe remote stream successfully: " + stream.getId());
      if ($('div#video #agora_remote' + stream.getId()).length === 0) {
        $('div#video').append('<div id="agora_remote' + stream.getId() + '" style="float:left; width:810px;height:607px;display:inline-block;"></div>');
      }
      console.log(stream)
      stream.play('agora_remote' + stream.getId());
    });

    this.client.on('stream-removed', function (evt) {
      var stream = evt.stream;
      stream.stop();
      $('#agora_remote' + stream.getId()).remove();
      console.log("Remote stream is removed " + stream.getId());
    });

    this.client.on('peer-leave', function (evt) {
      var stream = evt.stream;
      if (stream) {
        stream.stop();
        $('#agora_remote' + stream.getId()).remove();
        console.log(evt.uid + " leaved from this channel");
      }
    });
  }


}
