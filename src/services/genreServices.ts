import { BookGenreRepository } from "./serviceInstances"

export const getGenreData =  async (take,skip) => {
         return  BookGenreRepository.findAndCount({
          take,
          skip
        })
}

export const getAllGenreData = async() =>{
    return BookGenreRepository.find();
}

