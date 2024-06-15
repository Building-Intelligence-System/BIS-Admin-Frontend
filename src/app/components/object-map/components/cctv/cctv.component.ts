import {Component, Input} from '@angular/core';
import {CCTV} from "../../../../core/entities/cctv/cctv.model";

@Component({
  selector: 'app-cctv',
  standalone: true,
  imports: [],
  templateUrl: './cctv.component.html',
  styleUrl: './cctv.component.scss'
})
export class CctvComponent {
  @Input({required: true}) cctvObject: CCTV | undefined;

  protected selectCCTVUrl: number = 0;

  protected handleSelectCCTV(index: number) {
    this.selectCCTVUrl = index;
  }
}
