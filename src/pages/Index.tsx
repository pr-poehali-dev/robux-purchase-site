import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [customAmount, setCustomAmount] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(0);
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [username, setUsername] = useState('');
  const { toast } = useToast();

  const ROBUX_RATE = 0.7625;

  const packages = [
    { id: 1, amount: 400, price: 305, popular: false },
    { id: 2, amount: 800, price: 610, popular: true },
    { id: 3, amount: 1700, price: 1295, popular: false },
    { id: 4, amount: 4500, price: 3430, popular: false },
  ];

  const reviews = [
    { name: 'Алексей М.', rating: 5, text: 'Быстро и надёжно! Робуксы пришли меньше чем за минуту.' },
    { name: 'Мария К.', rating: 5, text: 'Лучший сервис! Пользуюсь уже полгода, всё отлично.' },
    { name: 'Дмитрий П.', rating: 5, text: 'Промокод сработал, получил скидку 10%. Рекомендую!' },
  ];

  const faqItems = [
    { q: 'Как быстро приходят робуксы?', a: 'Обычно робуксы зачисляются в течение 1-5 минут после оплаты.' },
    { q: 'Безопасно ли покупать здесь?', a: 'Да, мы используем официальные методы пополнения и защищённые платёжные системы.' },
    { q: 'Можно ли вернуть деньги?', a: 'Возврат возможен в течение 24 часов, если робуксы не были зачислены по нашей вине.' },
    { q: 'Где взять промокод?', a: 'Промокоды публикуются в нашей группе ВКонтакте и Telegram-канале.' },
  ];

  const promoCodes: { [key: string]: number } = {
    'WELCOME10': 10,
    'SALE15': 15,
    'PROMO20': 20,
  };

  const applyPromoCode = () => {
    const code = promoCode.toUpperCase();
    if (promoCodes[code]) {
      setDiscount(promoCodes[code]);
      toast({
        title: '✅ Промокод применён!',
        description: `Вы получили скидку ${promoCodes[code]}%`,
      });
    } else {
      toast({
        title: '❌ Неверный промокод',
        description: 'Проверьте правильность ввода',
        variant: 'destructive',
      });
    }
  };

  const calculatePrice = (price: number) => {
    if (discount > 0) {
      return Math.round(price * (1 - discount / 100));
    }
    return price;
  };

  const calculateCustomRobux = (amount: string) => {
    const num = parseInt(amount);
    if (isNaN(num) || num < 100) return 0;
    return Math.round(num * ROBUX_RATE);
  };

  const handleCustomBuy = () => {
    const amount = parseInt(customAmount);
    if (isNaN(amount) || amount < 100) {
      toast({
        title: '❌ Ошибка',
        description: 'Минимальная сумма пополнения — 100₽',
        variant: 'destructive',
      });
      return;
    }
    const robux = calculateCustomRobux(customAmount);
    const finalPrice = calculatePrice(amount);
    setSelectedAmount(robux);
    setSelectedPrice(finalPrice);
    setIsDialogOpen(true);
  };

  const handlePackageBuy = (amount: number, price: number) => {
    setSelectedAmount(amount);
    setSelectedPrice(calculatePrice(price));
    setIsDialogOpen(true);
  };

  const handlePayment = () => {
    if (!username.trim()) {
      toast({
        title: '❌ Ошибка',
        description: 'Введите ваш никнейм в Roblox',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: '🚀 Переход к оплате',
      description: `${selectedAmount} робуксов • ${selectedPrice}₽`,
    });

    setIsDialogOpen(false);
    setUsername('');
    setCustomAmount('');
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur-sm z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Coins" size={24} className="text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold">RobuxShop</span>
            </div>
            <nav className="hidden md:flex gap-6">
              <a href="#catalog" className="hover:text-primary transition-colors">Каталог</a>
              <a href="#calculator" className="hover:text-primary transition-colors">Калькулятор</a>
              <a href="#reviews" className="hover:text-primary transition-colors">Отзывы</a>
              <a href="#faq" className="hover:text-primary transition-colors">FAQ</a>
              <a href="#contact" className="hover:text-primary transition-colors">Контакты</a>
            </nav>
          </div>
        </div>
      </header>

      <section className="py-20 animate-fade-in">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Покупай робуксы
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Быстро, безопасно и выгодно. Мгновенное зачисление на ваш аккаунт.
          </p>
          <Button size="lg" className="text-lg px-8" onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}>
            <Icon name="ShoppingCart" size={20} className="mr-2" />
            Начать покупку
          </Button>
        </div>
      </section>

      <section id="calculator" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Калькулятор робуксов</h2>
          <div className="max-w-2xl mx-auto">
            <Card className="animate-scale-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Calculator" size={24} />
                  Рассчитайте своё количество
                </CardTitle>
                <CardDescription>Купите ровно столько, сколько вам нужно (минимум 100₽)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="rubles">Сумма в рублях</Label>
                    <Input
                      id="rubles"
                      type="number"
                      placeholder="100"
                      min="100"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      className="text-lg"
                    />
                  </div>
                  <div>
                    <Label>Вы получите робуксов</Label>
                    <div className="h-10 flex items-center justify-center bg-primary/10 rounded-lg text-2xl font-bold text-primary">
                      {calculateCustomRobux(customAmount) || '—'}
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-muted rounded-lg space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Курс:</span>
                    <span className="font-semibold">1₽ = {ROBUX_RATE.toFixed(2)} робуксов</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Ваша выгода:</span>
                    <span className="font-semibold text-primary">Комиссия 7%</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Скидка по промокоду:</span>
                      <span className="font-semibold text-secondary">{discount}%</span>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button size="lg" className="w-full" onClick={handleCustomBuy}>
                  <Icon name="ShoppingCart" size={20} className="mr-2" />
                  Купить за {customAmount ? calculatePrice(parseInt(customAmount)) : '—'}₽
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      <section id="catalog" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Популярные пакеты</h2>
          
          <div className="max-w-md mx-auto mb-8">
            <Card className="animate-scale-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Tag" size={20} />
                  Есть промокод?
                </CardTitle>
                <CardDescription>Получите дополнительную скидку</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Input
                    placeholder="Введите промокод"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={applyPromoCode}>
                    Применить
                  </Button>
                </div>
                {discount > 0 && (
                  <div className="mt-3 p-3 bg-primary/10 rounded-lg text-center">
                    <p className="text-sm font-semibold text-primary">
                      🎉 Скидка {discount}% активна!
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {packages.map((pkg) => (
              <Card key={pkg.id} className={`relative hover:scale-105 transition-transform ${pkg.popular ? 'border-primary border-2' : ''}`}>
                {pkg.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-secondary">
                    Популярный
                  </Badge>
                )}
                <CardHeader>
                  <CardTitle className="text-3xl text-center">
                    <Icon name="Coins" size={32} className="inline-block text-primary mb-2" />
                    <div>{pkg.amount}</div>
                  </CardTitle>
                  <CardDescription className="text-center">Робуксов</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-4xl font-bold mb-2">
                    {discount > 0 && (
                      <div className="text-lg text-muted-foreground line-through">{pkg.price}₽</div>
                    )}
                    {calculatePrice(pkg.price)}₽
                  </div>
                  {discount > 0 && (
                    <Badge variant="secondary" className="mb-2">Экономия {pkg.price - calculatePrice(pkg.price)}₽</Badge>
                  )}
                </CardContent>
                <CardFooter>
                  <Button className="w-full" size="lg" onClick={() => handlePackageBuy(pkg.amount, pkg.price)}>
                    <Icon name="ShoppingCart" size={18} className="mr-2" />
                    Купить
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Отзывы покупателей</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {reviews.map((review, idx) => (
              <Card key={idx} className="animate-fade-in">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{review.name}</CardTitle>
                    <div className="flex gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Icon key={i} name="Star" size={16} className="text-primary fill-primary" />
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{review.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Часто задаваемые вопросы</h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible>
              {faqItems.map((item, idx) => (
                <AccordionItem key={idx} value={`item-${idx}`}>
                  <AccordionTrigger className="text-left">{item.q}</AccordionTrigger>
                  <AccordionContent>{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <section id="contact" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Контакты</h2>
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Свяжитесь с нами</CardTitle>
                <CardDescription>Мы всегда готовы помочь</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Icon name="Mail" size={20} className="text-primary" />
                  <span>support@robuxshop.ru</span>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="MessageCircle" size={20} className="text-primary" />
                  <span>Telegram: @robuxshop_support</span>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="Clock" size={20} className="text-primary" />
                  <span>Поддержка 24/7</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2024 RobuxShop. Все права защищены.</p>
          <p className="text-sm mt-2">Мы не связаны с Roblox Corporation</p>
        </div>
      </footer>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Icon name="ShoppingCart" size={24} />
              Оформление заказа
            </DialogTitle>
            <DialogDescription>
              Выберите способ оплаты и заполните данные
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-primary/10 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">Вы покупаете:</span>
                <span className="text-xl font-bold text-primary">{selectedAmount} робуксов</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">К оплате:</span>
                <span className="text-2xl font-bold">{selectedPrice}₽</span>
              </div>
            </div>

            <div>
              <Label htmlFor="username">Никнейм в Roblox</Label>
              <Input
                id="username"
                placeholder="Ваш никнейм"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div>
              <Label>Способ оплаты</Label>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="mt-2">
                <div className="flex items-center space-x-2 p-3 border border-border rounded-lg hover:bg-muted/50 cursor-pointer">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer flex-1">
                    <Icon name="CreditCard" size={20} className="text-primary" />
                    Банковская карта
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border border-border rounded-lg hover:bg-muted/50 cursor-pointer">
                  <RadioGroupItem value="sbp" id="sbp" />
                  <Label htmlFor="sbp" className="flex items-center gap-2 cursor-pointer flex-1">
                    <Icon name="Smartphone" size={20} className="text-primary" />
                    СБП (Система Быстрых Платежей)
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border border-border rounded-lg hover:bg-muted/50 cursor-pointer">
                  <RadioGroupItem value="yoomoney" id="yoomoney" />
                  <Label htmlFor="yoomoney" className="flex items-center gap-2 cursor-pointer flex-1">
                    <Icon name="Wallet" size={20} className="text-primary" />
                    ЮMoney
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handlePayment} className="w-full" size="lg">
              <Icon name="Lock" size={18} className="mr-2" />
              Перейти к оплате
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
