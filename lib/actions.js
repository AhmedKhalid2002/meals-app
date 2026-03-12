'use server';

import { saveData } from './meals';

export async function shareImage(formData) {
  const meal = {
    title: formData.get('title'),
    summary: formData.get('summary'),
    creator: formData.get('name'),
    creator_email: formData.get('email'),
    instructions: formData.get('instructions'),
    image: formData.get('image'),
  };

  await saveData(meal);
}
