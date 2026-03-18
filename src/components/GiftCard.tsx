"use client";

import React from "react";
import { Gift, GiftStatus } from "@/lib/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Lock, Gift as GiftIcon, Tag } from "lucide-react";
import { cn } from "@/lib/utils";

interface GiftCardProps {
  gift: Gift;
  onClaim?: (id: string) => void;
  isAdmin?: boolean;
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
}

export function GiftCard({ gift, onClaim, isAdmin, onDelete }: GiftCardProps) {
  const isAvailable = gift.status === "disponivel";

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md group flex flex-col h-full bg-white border-primary/10">
      <div
        className="w-full overflow-hidden border-b border-border flex items-center justify-center relative"
        style={{ height: 200, backgroundColor: '#F9F9F9' }}
      >
        <div
          className="w-full h-full flex items-center justify-center"
          style={{
            borderLeft: '1px solid rgba(0,0,0,0.02)',
            borderRight: '1px solid rgba(0,0,0,0.02)',
            boxSizing: 'border-box',
          }}
        >
          <div className="flex flex-col items-center justify-center w-full h-full">
            <div
              className="rounded-md p-4"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 120,
                height: 120,
                borderRadius: 8,
              }}
            >
              <GiftIcon size={56} style={{ color: 'rgba(85,107,47,0.35)' }} />
            </div>
          </div>
        </div>
        {/* watermark initials */}
        <div
          style={{
            position: 'absolute',
            right: 12,
            bottom: 12,
            fontSize: 18,
            color: 'rgba(85,107,47,0.06)',
            fontFamily: 'serif',
          }}
        >
          A & H
        </div>
        <div className="absolute top-2 right-2">
          <Badge 
            variant={isAvailable ? "default" : "secondary"}
            className={cn(
              "shadow-sm px-3 py-1",
              isAvailable ? "bg-primary hover:bg-primary/90" : "bg-muted-foreground/20 text-muted-foreground"
            )}
          >
            {isAvailable ? "Disponível" : "Já Escolhido"}
          </Badge>
        </div>
      </div>
      
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="text-xl font-headline font-bold text-foreground">
            {gift.nome}
          </CardTitle>
          {gift.categoria && (
            <div className="flex items-center text-xs text-muted-foreground">
              <Tag className="w-3 h-3 mr-1" />
              {gift.categoria}
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="p-4 pt-0 flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-2 italic">
          {gift.descricao || "Sem descrição disponível."}
        </p>
        {!isAvailable && isAdmin && gift.dadoPor && (
          <div className="mt-3 p-2 bg-secondary/50 rounded-md text-sm flex items-center gap-2 text-accent">
            <Check className="w-4 h-4" />
            <span>Presenteado por: <strong>{gift.dadoPor}</strong></span>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="p-4 pt-2 border-t border-primary/5">
        {isAdmin ? (
          <div className="flex gap-2 w-full">
            <Button 
              variant="outline" 
              className="flex-1 text-xs"
              onClick={() => onDelete?.(gift.id)}
            >
              Excluir
            </Button>
            <Button 
              variant="secondary" 
              className="flex-1 text-xs"
              onClick={() => onDelete ? undefined : null}
              onClickCapture={() => { /* placeholder, real handler passed via prop */ }}
              onClick={(e) => {
                e.stopPropagation();
                // call provided onEdit prop if present
                // @ts-ignore
                typeof (onEdit) === 'function' && onEdit(gift.id);
              }}
            >
              Editar
            </Button>
          </div>
        ) : (
          <Button 
            onClick={() => onClaim?.(gift.id)}
            disabled={!isAvailable}
            className={cn(
              "w-full transition-all",
              isAvailable 
                ? "bg-primary hover:bg-accent text-white" 
                : "bg-muted text-muted-foreground cursor-not-allowed"
            )}
          >
            {isAvailable ? (
              <span className="flex items-center gap-2">
                Escolher Presente <GiftIcon size={16} />
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Reservado com carinho <Lock size={16} />
              </span>
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}