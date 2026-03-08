import sql from 'better-sqlite3';

const db = sql('meals.db');

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return db.prepare('SELECT * FROM meals').all();
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