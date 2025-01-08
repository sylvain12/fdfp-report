"use client"

import React from 'react'
import { Alert, AlertDescription, AlertTitle } from '../ui/alert'
import { Button } from '../ui/button';

interface AlertProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  message?: string;
  title?: string;
  onRetry?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function AlertFallback({ message, title, onRetry, ...props }: AlertProps) {
  return (
    <div>
      <Alert className='space-y-4'>
        {title && <AlertTitle>{title}</AlertTitle>}
        <AlertDescription>
          {message ? message : "Une erreur s'est produite. Veuillez réessayer."}
        </AlertDescription>
        <Button {...props} onClick={onRetry}>
          Réessayer
        </Button>
      </Alert>
    </div>
  );
}
