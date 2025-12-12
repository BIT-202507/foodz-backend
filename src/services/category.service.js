import CategoryModel from "../models/Category/Category.model.js";

const dbGetCategoryById = async (parent_id) => {
    return await CategoryModel.findById(parent_id);
}

const dbCreateCategory = (newCategory) => {
    return new CategoryModel(newCategory);
}

export {
    dbGetCategoryById,
    dbCreateCategory
}