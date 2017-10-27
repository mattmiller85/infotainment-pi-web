import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'cast-tile',
  templateUrl: './cast-tile.component.html',
  styleUrls: ['./cast-tile.component.css'],
})
export class CastTileComponent implements OnInit, AfterViewInit {

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    let s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "//www.gstatic.com/cast/sdk/libs/caf_receiver/v3/cast_receiver_framework.js";
    //cast.framework.CastReceiverContext.getInstance().start();
    //alert("here");
    this.elementRef.nativeElement.appendChild(s);
    s = document.createElement("script");
    s.type = "text/javascript";
    s.nodeValue = "cast.framework.CastReceiverContext.getInstance().start()";
    this.elementRef.nativeElement.appendChild(s);
    s = document.createElement("script");
    s.type = "text/javascript";
    s.nodeValue = "alert('here');";
    this.elementRef.nativeElement.appendChild(s);
  }

}
