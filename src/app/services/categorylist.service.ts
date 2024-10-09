import { CategoryListRepo } from '../repositories/categorylist.repo';


export class CategoryListService {
  private categoryListRepo: CategoryListRepo;

  constructor() {
    this.categoryListRepo = new CategoryListRepo();
  }

  async insertIntoCategoryItems(categoryName: string[][]){
    await this.categoryListRepo.insertIntoCategoryItems(categoryName)
  }

  async getAllCategory(){
    return await this.categoryListRepo.getAllCategory()
  }
  
}