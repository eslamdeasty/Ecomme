import { timeout } from 'q';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  carouselOptions = 
  {
    items: 1, 
    dots: false, 
    navigation: false, 
    loop:true,
    margin:10,
    autoplay:true,
    animateOut: 'fadeOut',
    autoHeight: true,
    autoHeightClass: 'owl-height',
    
}
  products = [];
  
  constructor(private router: Router,
              private productService: ProductService,
              private toastr: ToastrService) {
        this.dataSource.data = TREE_DATA;
        this.productService.getAllProducts().subscribe(data =>{
        this.products = data.products ;
     },
     error =>{
       console.log(error)
     });
   }

  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  }
  ngOnInit() {
  }
  productHome(item){
    this.router.navigate([`product/${item}`])
  }
  addToCart(product){
    this.productService.addToCart(product).subscribe(
      (data) => {
        console.log('added successfully');
        this.toastr.success('Added to cart', '', {timeOut: 3000});
        this.router.navigate([`/products`]);
      } ,
      (err) => {
        console.log(err)
      }
    );
  }


  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);

treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.children);

dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);


hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
  



}



/**
 * Food data with nested structure.
 * Each node has a name and an optiona list of children.
 */
interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Mens',
    children: [
      {name: 'Shirt'},
      {name: 'Shoes'},
      {name: 'Jeans'},
    ]
  }, {
    name: 'Womens',
    children: [
      {name: 'Shirt'},
      {name: 'Shoes'},
      {name: 'Jeans'},
    ]
  },{
    name: 'Child',
    children: [
      {name: 'Shirt'},
      {name: 'Shoes'},
      {name: 'Jeans'},
    ]
  },
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}