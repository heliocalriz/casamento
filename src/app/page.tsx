"use client";

import { useEffect, useState } from "react";
import { getGifts, claimGift } from "@/lib/firebase-mock";
import { Gift } from "@/lib/types";
import { GiftCard } from "@/components/GiftCard";
import { ClaimDialog } from "@/components/ClaimDialog";
import { Navbar } from "@/components/Navbar";
import { useToast } from "@/hooks/use-toast";
import { Sparkles } from "lucide-react";

export default function Home() {
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [loading, setLoading] = useState(true);
  const [claimModalOpen, setClaimModalOpen] = useState(false);
  const [selectedGift, setSelectedGift] = useState<{id: string, name: string} | null>(null);
  const { toast } = useToast();

  const loadGifts = async () => {
    setLoading(true);
    try {
      const data = await getGifts();
      setGifts(data);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Erro ao carregar",
        description: "Não foi possível carregar a lista de presentes.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGifts();
  }, []);

  const handleClaimRequest = (id: string) => {
    const gift = gifts.find(g => g.id === id);
    if (gift) {
      setSelectedGift({ id: gift.id, name: gift.nome });
      setClaimModalOpen(true);
    }
  };

  const handleConfirmClaim = async (id: string, name: string) => {
    try {
      await claimGift(id, name);
      toast({
        title: "Sucesso!",
        description: `O presente foi reservado por você. Muito obrigado!`,
      });
      loadGifts();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao reservar",
        description: "Ocorreu um problema ao tentar reservar o presente.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        <header className="max-w-2xl mx-auto text-center mb-16 animate-in fade-in slide-in-from-top-4 duration-1000">
          <h1 className="text-5xl font-headline font-bold text-primary mb-4 flex items-center justify-center gap-3">
            Nossa Lista de Desejos <Sparkles className="text-accent" />
          </h1>
          <p className="text-xl text-muted-foreground font-body leading-relaxed">
            Estamos muito felizes em celebrar este momento com vocês. Se desejar nos presentear, 
            criamos esta lista para facilitar a sua escolha.
          </p>
        </header>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-96 rounded-lg bg-white/50 animate-pulse border border-primary/5" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {gifts.map((gift) => (
              <GiftCard 
                key={gift.id} 
                gift={gift} 
                onClaim={handleClaimRequest}
              />
            ))}
          </div>
        )}

        {gifts.length === 0 && !loading && (
          <div className="text-center py-20 bg-white/30 rounded-2xl border border-dashed border-primary/20">
            <p className="text-muted-foreground text-lg">Ainda não há presentes na lista.</p>
          </div>
        )}
      </main>

      <ClaimDialog 
        isOpen={claimModalOpen}
        onClose={() => setClaimModalOpen(false)}
        giftId={selectedGift?.id || null}
        giftName={selectedGift?.name || null}
        onConfirm={handleConfirmClaim}
      />
      
      <footer className="py-12 border-t border-primary/10 mt-20">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} GiftLink. Feito com carinho para momentos especiais.</p>
        </div>
      </footer>
    </div>
  );
}