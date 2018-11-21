import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { WebcamService } from '../../services/webcam.service';
declare var WebCam: any;

@Component({
  selector: 'app-webcam',
  templateUrl: './webcam.component.html',
  styleUrls: ['./webcam.component.scss'],
  providers: [
    WebcamService
  ]
})

export class WebcamComponent implements AfterViewInit {
  public cameras: any = [];

  @ViewChild('cameraContainer') cameraContainer;
  private controlEnabled: boolean;
  private cameraView: any;
  private cameraContainerDiv: any;
  private btnControl: string;
  private btnCameras: string;
  private controlPanel: string;
  private cameraList: string;

  constructor(private webcamService: WebcamService) {
    this.controlEnabled = false;
    this.btnCameras = 'btn-secondary';
    this.btnControl = 'btn-outline-secondary';
    this.controlPanel = 'd-none';
    this.cameraList = 'd-flex';
  }

  ngAfterViewInit() {
    this.webcamService.getCameraList()
    .subscribe(
      (success) => {
        this.cameraView = WebCam.getCameraNode();
        if (success.length > 0 ) {
          this.cameras = success;
          this.cameraView.childNodes[0].src = this.cameras[0].source;
        }
        this.cameraContainerDiv = this.cameraContainer.nativeElement;
        this.cameraContainerDiv.appendChild(this.cameraView);
      },
      error => {
        alert(error);
      }
    );
  }

  switchRightPanel(isControlPanel) {
    this.btnControl = isControlPanel ? 'btn-secondary' : 'btn-outline-secondary';
    this.btnCameras = isControlPanel ? 'btn-outline-secondary' : 'btn-secondary';
    this.controlPanel = isControlPanel ? 'd-flex' : 'd-none';
    this.cameraList = isControlPanel ? 'd-none' : 'd-flex';
  }

  mouseDownEvent(event) {
    if (!this.controlEnabled) {
      this.controlEnabled = true;
    }
  }
  mouseMoveEvent(event) {
    if (this.controlEnabled) {
      WebCam.move(event.movementX * 20, -(event.movementY * 20));
    }
  }
  mouseUpEvent(event) {
    if (this.controlEnabled) {
      this.controlEnabled = false;
    }
  }

  mouseLeaveEvent(event) {
    if (this.controlEnabled) {
      this.controlEnabled = false;
    }
  }

  replaceCameraSource(camera: any) {
    const oldCameraView = this.cameraView;
    this.cameraView.childNodes[0].src = camera.source;
    this.cameraContainerDiv.replaceChild(oldCameraView, this.cameraView);
  }

}
