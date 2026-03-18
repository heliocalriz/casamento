"use client";

import { useEffect, useState } from "react";
import { getGifts, addGift, deleteGift, updateGift } from "@/lib/firebase-mock";
import { Gift } from "@/lib/types";
import { GiftCard } from "@/components/GiftCard";
import { Navbar } from "@/components/Navbar";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Plus, Wand2, Loader2, Trash2 } from "lucide-react";
import { generateGiftDescription } from "@/ai/flows/generate-gift-description-flow";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function AdminPage() {
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState<boolean>(() => {
    try {
      return typeof window !== 'undefined' && sessionStorage.getItem('admin-authed') === 'true';
    } catch (e) {
      return false;
    }
  });
  const [aiLoading, setAiLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingGift, setEditingGift] = useState<Gift | null>(null);
  const [editForm, setEditForm] = useState({ nome: '', categoria: '', descricao: '', resetToAvailable: false });
  const { toast } = useToast();
  const [password, setPassword] = useState('');

  const [newGift, setNewGift] = useState({
    nome: "",
    categoria: "",
    descricao: "",
    status: "disponivel" as const,
  });

  const loadGifts = async () => {
    setLoading(true);
    try {
      const data = await getGifts();
      setGifts(data);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível carregar os presentes.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authenticated) loadGifts();
  }, []);

  const handleAddGift = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Pick a random image from placeholders for the demo
      const randomImage = PlaceHolderImages[Math.floor(Math.random() * PlaceHolderImages.length)].imageUrl;
      
      await addGift({
        ...newGift,
        imageUrl: randomImage
      });
      
      toast({
        title: "Sucesso!",
        description: "Presente adicionado à lista.",
      });
      
      setIsModalOpen(false);
      setNewGift({ nome: "", categoria: "", descricao: "", status: "disponivel" });
      loadGifts();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Falha ao adicionar presente.",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja remover este presente?")) {
      try {
        await deleteGift(id);
        toast({ title: "Removido", description: "O presente foi excluído." });
        loadGifts();
      } catch (error) {
        toast({ variant: "destructive", title: "Erro ao excluir" });
      }
    }
  };

  const handleResetToAvailable = async (id: string) => {
    if (!confirm('Deseja realmente voltar este item para disponível e remover os dados do presenteador?')) return;
    try {
      await updateGift(id, { status: 'disponivel', dadoPor: null });
      toast({ title: 'Atualizado', description: 'O presente foi marcado como disponível.' });
      loadGifts();
    } catch (error) {
      toast({ variant: 'destructive', title: 'Erro', description: 'Falha ao atualizar o presente.' });
    }
  }

  const openEditModal = (id: string) => {
    const g = gifts.find(x => x.id === id);
    if (!g) return;
    setEditingGift(g);
    setEditForm({ nome: g.nome || '', categoria: g.categoria || '', descricao: g.descricao || '', resetToAvailable: false });
    setIsEditModalOpen(true);
  }

  const handleSaveEdit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!editingGift) return;

    const updates: Partial<Gift> = {
      nome: editForm.nome,
      categoria: editForm.categoria || undefined,
      descricao: editForm.descricao || undefined,
    };

    if (editForm.resetToAvailable && editingGift.status === 'indisponivel') {
      updates.status = 'disponivel';
      // @ts-ignore
      updates.dadoPor = null;
    }

    try {
      // Update backend/mock
      await updateGift(editingGift.id, updates as Partial<Gift>);

      // Update local state for instant UI feedback
      setGifts(prev => prev.map(g => g.id === editingGift.id ? { ...g, ...updates } as Gift : g));

      toast({ title: 'Salvo', description: 'Alterações salvas com sucesso.' });
      setIsEditModalOpen(false);
      setEditingGift(null);
    } catch (error) {
      toast({ variant: 'destructive', title: 'Erro', description: 'Falha ao salvar alterações.' });
    }
  }

  const handleAiGeneration = async () => {
    if (!newGift.nome) {
      toast({ title: "Aviso", description: "Digite o nome do presente primeiro." });
      return;
    }

    setAiLoading(true);
    try {
      const result = await generateGiftDescription({
        giftName: newGift.nome,
        giftCategory: newGift.categoria || undefined
      });
      setNewGift(prev => ({ ...prev, descricao: result.description }));
      toast({ title: "IA Criativa", description: "Descrição gerada com sucesso!" });
    } catch (error) {
      toast({ variant: "destructive", title: "Erro na IA", description: "Não foi possível gerar a descrição." });
    } finally {
      setAiLoading(false);
    }
  };

  const handleAuth = (e?: React.FormEvent) => {
    e?.preventDefault();
    const SECRET = 'helinho2001';
    if (password === SECRET) {
      try {
        sessionStorage.setItem('admin-authed', 'true');
      } catch (e) {}
      setAuthenticated(true);
      loadGifts();
      toast({ title: 'Autenticado', description: 'Acesso ao painel concedido.' });
    } else {
      toast({ variant: 'destructive', title: 'Senha incorreta', description: 'Verifique a senha e tente novamente.' });
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-full max-w-md p-8 bg-card rounded-lg shadow-sm">
          <h2 className="text-2xl font-headline mb-4">Área administrativa</h2>
          <p className="text-sm text-muted-foreground mb-4">Insira a senha para acessar o painel de gerenciamento.</p>
          <form onSubmit={handleAuth} className="space-y-4">
            <Input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Senha" />
            <div className="flex justify-end">
              <Button onClick={handleAuth} className="bg-primary text-white">Entrar</Button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-headline font-bold text-primary">Painel do Anfitrião</h1>
            <p className="text-muted-foreground">Gerencie a lista de presentes e acompanhe as escolhas.</p>
          </div>
          
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-accent text-white flex items-center gap-2">
                <Plus size={20} /> Novo Presente
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle className="font-headline text-2xl text-primary">Adicionar Novo Presente</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddGift} className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome do Presente</Label>
                  <Input 
                    id="nome" 
                    required 
                    value={newGift.nome}
                    onChange={e => setNewGift({...newGift, nome: e.target.value})}
                    placeholder="Ex: Jogo de Pratos" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="categoria">Categoria (Opcional)</Label>
                  <Input 
                    id="categoria" 
                    value={newGift.categoria}
                    onChange={e => setNewGift({...newGift, categoria: e.target.value})}
                    placeholder="Ex: Cozinha, Quarto..." 
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="descricao">Descrição</Label>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm" 
                      className="text-primary hover:text-accent flex items-center gap-1"
                      onClick={handleAiGeneration}
                      disabled={aiLoading}
                    >
                      {aiLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
                      Sugestão IA
                    </Button>
                  </div>
                  <Textarea 
                    id="descricao" 
                    rows={4}
                    value={newGift.descricao}
                    onChange={e => setNewGift({...newGift, descricao: e.target.value})}
                    placeholder="Descreva o presente ou use a IA para gerar uma descrição criativa..." 
                  />
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
                  <Button type="submit" className="bg-primary text-white">Salvar Presente</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
            {/* Edit Modal */}
            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle className="font-headline text-2xl text-primary">Editar Presente</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSaveEdit} className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-nome">Nome do Item</Label>
                    <Input
                      id="edit-nome"
                      required
                      value={editForm.nome}
                      onChange={e => setEditForm(prev => ({ ...prev, nome: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-categoria">Categoria (Opcional)</Label>
                    <Input
                      id="edit-categoria"
                      value={editForm.categoria}
                      onChange={e => setEditForm(prev => ({ ...prev, categoria: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-descricao">Descrição</Label>
                    <Textarea
                      id="edit-descricao"
                      rows={4}
                      value={editForm.descricao}
                      onChange={e => setEditForm(prev => ({ ...prev, descricao: e.target.value }))}
                    />
                  </div>

                  {editingGift && editingGift.status === 'indisponivel' && (
                    <div className="p-3 bg-secondary/20 rounded-md">
                      <p className="font-semibold">Status: Já Escolhido</p>
                      <div className="mt-2 flex items-center gap-3">
                        <input
                          id="reset-available"
                          type="checkbox"
                          checked={editForm.resetToAvailable}
                          onChange={e => setEditForm(prev => ({ ...prev, resetToAvailable: e.target.checked }))}
                        />
                        <Label htmlFor="reset-available">Voltar Item a Disponível (remover dados do presenteador)</Label>
                      </div>
                    </div>
                  )}

                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => { setIsEditModalOpen(false); setEditingGift(null); }}>Cancelar</Button>
                    <Button type="submit" className="bg-primary text-white">Salvar Alterações</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Summary Stat */}
          <Card className="md:col-span-3 bg-white/40 border-primary/10">
            <CardContent className="p-6 flex justify-around text-center">
              <div>
                <p className="text-sm text-muted-foreground uppercase tracking-wider font-bold">Total de Itens</p>
                <p className="text-3xl font-headline font-bold text-primary">{gifts.length}</p>
              </div>
              <div className="w-px bg-primary/10 h-10 my-auto" />
              <div>
                <p className="text-sm text-muted-foreground uppercase tracking-wider font-bold">Disponíveis</p>
                <p className="text-3xl font-headline font-bold text-green-600">{gifts.filter(g => g.status === 'disponivel').length}</p>
              </div>
              <div className="w-px bg-primary/10 h-10 my-auto" />
              <div>
                <p className="text-sm text-muted-foreground uppercase tracking-wider font-bold">Escolhidos</p>
                <p className="text-3xl font-headline font-bold text-accent">{gifts.filter(g => g.status === 'indisponivel').length}</p>
              </div>
            </CardContent>
          </Card>

          {loading ? (
            <div className="col-span-3 flex justify-center py-12">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
            </div>
          ) : (
            gifts.map((gift) => (
              <GiftCard 
                key={gift.id} 
                gift={gift} 
                isAdmin 
                onDelete={handleDelete}
                onEdit={openEditModal}
              />
            ))
          )}
        </div>

        {!loading && gifts.length === 0 && (
          <div className="text-center py-20 bg-white/30 rounded-2xl border border-dashed border-primary/20 mt-8">
            <p className="text-muted-foreground text-lg">A lista está vazia. Comece adicionando o primeiro presente!</p>
          </div>
        )}
      </main>
    </div>
  );
}