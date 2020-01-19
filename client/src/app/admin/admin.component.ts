import { ProductService } from './../services/product.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FileUploader } from 'ng2-file-upload';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
const URL = 'http://localhost:3000/products/add';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  productForm: FormGroup;
images;
  // Uploading the file to the server
  public uploader: FileUploader = new FileUploader({
    url: URL,
    itemAlias: 'image'
  });
  registeredProduct: boolean;

  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
    }
  }
  constructor(private toastr: ToastrService,
              private formBuilder: FormBuilder,
              private productService: ProductService,
              private _router: Router) { }

  ngOnInit() {

    this.productForm = this.formBuilder.group({
      productName: [null, [Validators.required, Validators.minLength(3)]],
      price: [null, [Validators.required]],
      description: [null, [Validators.required]],
      size: [null, [Validators.required]],
      image: [null, [Validators.required]]
    });


    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.uploader.onCompleteItem = (item: any, status: any) => {
      console.log('Uploaded File Details:', item);
      this.toastr.success('File successfully uploaded!');
    };
  }
  productRegister() {


    // stop here if form is invalid
    if (this.productForm.invalid) {
      console.log(this.productForm)
      return;
    } else {
      console.log(this.productForm.value);
      const productData = new FormData();
      productData.append("productName", this.productForm.value.productName);
      productData.append("price", this.productForm.value.price);
      productData.append("description", this.productForm.value.description);
      productData.append("size", this.productForm.value.size);
      productData.append('file', this.images);

      this.productService.addProduct(productData)
        .subscribe(
          data => {
            console.log(data);
          },
          (error) =>{
            if (error){
              this.registeredProduct = true
            }
          }
        );
    }



  }
}
