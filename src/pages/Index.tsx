import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const { toast } = useToast();

  const packages = [
    { id: 1, amount: 400, price: 99, popular: false },
    { id: 2, amount: 800, price: 189, popular: true },
    { id: 3, amount: 1700, price: 369, popular: false },
    { id: 4, amount: 4500, price: 899, popular: false },
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

      <section id="catalog" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Выберите пакет</h2>
          
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
                  <Button className="w-full" size="lg">
                    <Icon name="ShoppingCart" size={18} className="mr-2" />
                    Купить
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="py-16">
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

      <section id="faq" className="py-16 bg-muted/30">
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

      <section id="contact" className="py-16">
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
    </div>
  );
};

export default Index;
