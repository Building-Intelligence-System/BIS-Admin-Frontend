import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {CCTV} from "../../../../core/entities/cctv/cctv.model";

@Component({
  selector: 'app-cctv',
  standalone: true,
  imports: [],
  templateUrl: './cctv.component.html',
  styleUrl: './cctv.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CctvComponent {
  @Input({required: true}) cctvObject: CCTV | undefined;
  @Output() cctvObjectClose: EventEmitter<MouseEvent> = new EventEmitter();

  protected selectCCTVUrl: number = 0;

  protected handleSelectCCTV(index: number) {
    this.selectCCTVUrl = index;
  }

  protected handleCCTVObjectClose($event: MouseEvent) {
    this.cctvObjectClose.emit($event);
  }
}
