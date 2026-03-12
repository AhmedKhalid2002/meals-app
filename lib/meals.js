import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';
import fs from 'node:fs';
import { error } from 'node:console';
const db = sql('meals.db');

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  // throw new Error("Loading meals faild")
  return db.prepare('SELECT * FROM meals').all();
}

export async function getMeal(slug) {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}
export async function saveData(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);
  // save image public folder
  const extention = meal.image.name.split('.').pop();
  const fileName = `${meal.slug}.${extention}`;
  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferImage = await meal.image.arrayBuffer();
  const buffer = Buffer.from(bufferImage);
  stream.write(buffer, (error) => {
    throw new Error('image save faild!');
  });
  // save database
  meal.image = `/images/${fileName}`;
  return db.prepare(`
    INSERT INTO meals (title, summary, instructions, creator, creator_email, image, slug) VALUES(
    @title,
     @summary, 
     @instructions,
      @creator,
       @creator_email,
        @image, @slug
    )
    `).run(meal);
}
// الفرق بين all  و get
/*
1️⃣ .all()
رجع كل الصفوف الناتجة عن الاستعلام على شكل مصفوفة من الكائنات.
إذا استخدمنا .all() سيُرجع:
[
  { id: 1, title: 'بيتزا', image: '/pizza.jpg', description: 'وصف بيتزا' },
  { id: 2, title: 'برجر', image: '/burger.jpg', description: 'وصف برجر' }
]
2️⃣ .get()
وظيفتها: تُرجع صف واحد فقط، ككائن.
{ id: 1, title: 'بيتزا', image: '/pizza.jpg', description: 'وصف بيتزا' }
*/
