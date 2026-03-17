"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ClaimDialogProps {
  giftId: string | null;
  giftName: string | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (id: string, name: string) => void;
}

export function ClaimDialog({ giftId, giftName, isOpen, onClose, onConfirm }: ClaimDialogProps) {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && giftId) {
      onConfirm(giftId, name);
      setName("");
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl text-primary">Escolher Presente</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Você está escolhendo presentear com: <strong className="text-foreground">{giftName}</strong>. 
            Por favor, deixe seu nome para que saibamos quem agradecer!
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Seu Nome
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
                placeholder="Ex: Maria Clara"
                required
                autoFocus
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-primary hover:bg-accent text-white">
              Confirmar Escolha
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}