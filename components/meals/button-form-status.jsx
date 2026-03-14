"use client"
import { useFormStatus } from 'react-dom';

export default function ButtonFormStatus() {
  const { pending } = useFormStatus();
  return (
    <>
      <button type='submit' disabled={pending}>{pending?"sending...":"Share Meal"}</button>
    </>
  );
}
