'use server';

import { redirect } from 'next/navigation';
import { saveData } from './meals';
import { revalidatePath } from 'next/cache';

export async function shareImage(prevState,formData) {
  const meal = {
    title: formData.get('title'),
    summary: formData.get('summary'),
    creator: formData.get('name'),
    creator_email: formData.get('email'),
    instructions: formData.get('instructions'),
    image: formData.get('image'),
  };
  if (
    !meal.title ||
    !meal.summary ||
    !meal.creator ||
    !meal.creator_email ||
    !meal.instructions ||
    !meal.image ||
    !meal.creator_email.includes('@')
  ) {
    return {
      message: "Invalid input. Please check your data."
    };
  }
  revalidatePath('/meals') // لحذف ال cahch
  await saveData(meal);
  redirect('/meals')
}
