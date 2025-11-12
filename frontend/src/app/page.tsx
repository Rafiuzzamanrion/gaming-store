'use client'
import {Button} from "@heroui/react"
export default function Home() {
  return (
    <main className="flex h-[300px] w-32 flex-col text- items-center justify-center p-24 bg-card rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-primary">Gaming Store</h1>
      <p className="mt-4 text-xl text-secondary">Welcome to your gaming destination!</p>
      <Button color={'success'} className="mt-6">
        Get Started
      </Button>
    </main>
  );
}
