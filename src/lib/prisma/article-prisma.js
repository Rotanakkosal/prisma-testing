import prisma from "./prisma";

export const getArticles = async () => {
  try {
    const articles = await prisma.article.findMany({
     include: {
          author: {
               select: {name: true, email:true}
          }
     }
    });
    return articles;
  } catch (e) {
    return { e };
  }
};

export const insertArticle = async (articleData) => {
  try {
    const article = await prisma.article.create({
         data: {
              title: articleData["title"],
              body: articleData["body"],
              author : {
                   connect: {
                        id: articleData["author"]
                   }
              }
         }
    })
    return article;
  } catch (e) {
    return { e };
  }
};
