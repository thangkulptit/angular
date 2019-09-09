import { PipeTransform, Pipe } from '@angular/core';
import { Product } from '../model/product.model';

@Pipe({
    name: 'productFilter'
})

export class ProductFilterPipe implements PipeTransform {
    transform(products: Product[], txtSearch: string): Product[] {
        if (!products || !txtSearch) {
            return products;
        }

        return products.filter(product => 
            product.name.toLowerCase().indexOf(txtSearch.toLowerCase()) !== -1);
    }

}