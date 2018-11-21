import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

declare var WebCam: any;

@Component({
  selector: 'app-webcam',
  templateUrl: './webcam.component.html',
  styleUrls: ['./webcam.component.scss']
})

export class WebcamComponent implements AfterViewInit {
  public cameras: object = [
    {
      'name': 'New Delhi',
      'id': 'delhi',
      'source': 'http://runningios.com/screamingbox/new-delhi.jpg'
    },
    {
      'name': 'New York',
      'id': 'newyork',
      'source': 'http://runningios.com/screamingbox/new-york.jpg'
    },
    {
      'name': 'Toronto',
      'id': 'toronto',
      'source': 'http://runningios.com/screamingbox/toronto.jpg'
    },
    {
      'name': 'Montreal',
      'id': 'montreal',
      'source': 'http://runningios.com/screamingbox/montreal.jpg'
    },
    {
      'name': 'Paris',
      'id': 'paris',
      'source': 'http://runningios.com/screamingbox/paris.jpg'
    }
  ];

  @ViewChild('cameraContainer') cameraContainer;
  private controlEnabled: boolean;
  private cameraView: any;
  private cameraContainerDiv: any;
  private btnControl: string;
  private btnCameras: string;
  private controlPanel: string;
  private cameraList: string;

  constructor() {
    this.controlEnabled = false;
    this.btnCameras = 'btn-secondary';
    this.btnControl = 'btn-outline-secondary';
    this.controlPanel = 'd-none';
    this.cameraList = 'd-flex';
  }

  ngAfterViewInit() {
    this.cameraView = WebCam.getCameraNode();
    this.cameraContainerDiv = this.cameraContainer.nativeElement;
    this.cameraContainerDiv.appendChild(this.cameraView);
  }

  switchRightPanel(isControlPanel) {
    this.btnControl = isControlPanel ? 'btn-secondary' : 'btn-outline-secondary';
    this.btnCameras = isControlPanel ? 'btn-outline-secondary' : 'btn-secondary';
    this.controlPanel = isControlPanel ? 'd-flex' : 'd-none';
    this.cameraList = isControlPanel ? 'd-none' : 'd-flex';
  }

  mouseDownEvent(event) {
    if (!this.controlEnabled) {
      console.log('start: ', event);
      this.controlEnabled = true;
    }
  }
  mouseMoveEvent(event) {
    if (this.controlEnabled) {
      console.log('move: ', event.movementX, event.movementY);
      WebCam.move(event.movementX * 20, -(event.movementY * 20));
    }
  }
  mouseUpEvent(event) {
    if (this.controlEnabled) {
      console.log('end:', event);
      this.controlEnabled = false;
    }
  }

  mouseLeaveEvent(event) {
    if (this.controlEnabled) {
      console.log('leave:', event);
      this.controlEnabled = false;
    }
  }

  replaceCameraSource(camera: any) {
    const oldCameraView = this.cameraView;
    this.cameraView.childNodes[0].src = camera.source;
    this.cameraContainerDiv.replaceChild(oldCameraView, this.cameraView);
  }

}
