import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService } from './services/product.service';
import { AuthService } from '../login/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products:any;
  productForm: FormGroup;
  registered = false;
  submitted = false;
  serviceErrors:any = {};
  isForm:boolean = true;
  isList:boolean = false
  isDetails:boolean = false;
  productDetail: any;

  constructor(
    private productService:ProductService,
    private formBuilder: FormBuilder, 
    private auth: AuthService,
    private router:Router
    ) {
      if(!auth.loggedIn)
      {
        this.router.navigate(['login']);
      }
    }

  ngOnInit() {
    this.productForm = this.formBuilder.group({
  		name: ['', [Validators.required, Validators.maxLength(100)]],
  		sku: ['', [Validators.required, Validators.maxLength(50)]],
  		price: ['', [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/)]],
  		quantity: ['', [Validators.required, Validators.pattern(/^[0-9]\d*$/)]],
  		description: ['', [Validators.required]],
  	});
    this.getAllProducts();
  }

  getAllProducts()
  {
    this.isForm = false;
    this.isDetails = false;
    this.isList = true;

    this.productService.getAllProducts().subscribe(res => {
      this.products = res.products;
      console.log(res);
    })
  }
  invalidName()
  {
  	return (this.submitted && (this.serviceErrors.name != null || this.productForm.controls.name.errors != null));
  }
  invalidSKU()
  {
  	return (this.submitted && (this.serviceErrors.sku != null || this.productForm.controls.sku.errors != null));
  }
  invalidPrice()
  {
  	return (this.submitted && (this.serviceErrors.price != null || this.productForm.controls.price.errors != null));
  }
  invalidQuantity()
  {
  	return (this.submitted && (this.serviceErrors.quantity != null || this.productForm.controls.quantity.errors != null));
  }
  invalidDescription()
  {
  	return (this.submitted && (this.serviceErrors.description != null || this.productForm.controls.description.errors != null));
  }
  viewDetails(product)
  {
    this.isForm = false;
    this.isDetails = true;
    this.isList = false;
    this.productDetail = product;
  }
  deleteProduct(product)
  {
    let conf = confirm('Are you sure to delete this product?')
    if(conf)
    {
      this.productService.deleteProduct(product.id).subscribe(res => {
        if(res.statusCode==200)
        {
          this.getAllProducts();
        }
      })
    }
  }
  openCreateForm()
  {
    this.isForm = true;
    this.isDetails = false;
    this.isList = false;
  }
  viewAllProducts(){
    this.isForm = false;
    this.isDetails = false;
    this.isList = true;
  }
  addProduct()
  {
    let payload = this.productForm.value;
    this.productService.createProduct(payload).subscribe(res => {
      if(res.statusCode==200)
      {
        this.productForm.reset();
        this.submitted = false;
        this.getAllProducts();
      }
    })
  }
  onSubmit()
  {
  	this.submitted = true;

  	if(this.productForm.invalid == true)
  	{
  		return;
  	}
  	else
  	{
      console.log(this.productForm.value);
      this.addProduct();
  		this.registered = true;
  	}
  }

}
