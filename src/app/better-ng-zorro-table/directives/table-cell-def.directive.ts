import {
  DestroyRef,
  Directive,
  inject,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TableColumnManagerService } from '../services/table-column-manager/table-column-manager.service';

@Directive({
  selector: '[tableCellDef]',
  standalone: true,
})
export class TableCellDefDirective implements OnInit {
  private tableColumnManager = inject(TableColumnManagerService);
  private templateRef = inject(TemplateRef);
  private viewContainerRef = inject(ViewContainerRef);
  private destroyRef = inject(DestroyRef);

  @Input({ alias: 'tableCellDef', required: true }) name!: string;

  ngOnInit() {
    // console.log('name var', this.name);
    // this.tableColumnManager
    //   .isColumnVisibleObs(this.name)
    //   .pipe(takeUntilDestroyed(this.destroyRef))
    //   .subscribe((visible) => {
    //     if (visible) {
    //       this.viewContainerRef.createEmbeddedView(this.templateRef);
    //     } else {
    //       this.viewContainerRef.clear();
    //     }
    //   });
  }
}
