import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit {
  @Input() tabTitle: string = ''
  @Input() tabIcon: string = ''
  @Input() active = false;
  @Input() tabId: string = ''

  constructor() { }

  ngOnInit(): void {
  }

}
