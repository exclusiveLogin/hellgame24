# HellGame 24 — Геолокационная MMO-платформа

Full-stack веб-платформа на Angular с геолокационной привязкой юнитов, крафтовой системой, встроенным мессенджером, блогом и dashboardʼом пользователя. Фронтенд геолокационной MMO-игры, работающей через погодные условия реального мира.

> Проект двух друзей. Составная часть 4 эпохи Цифрового присутствия.

## Ключевые модули

### Dashboard
- **Карта (Leaflet)** — отображение юнитов на реальной карте (тёмная тема Stadia Maps), клик по маркерам для просмотра деталей
- **Мессенджер** — внутренний IM между игроками
- **Блог** — пользовательский блог с постами
- **Статусы / Эмоции** — микростатусы пользователей, эмоции
- **Уведомления** — push-нотификации + notifier
- **Почта** — внутренняя почтовая система

### Accessory System (Крафтинг)
- **Инвентарь** — предметы пользователя (`inventory.service.ts`)
- **Рецепты** — система крафтинга из ингредиентов (`receipt.service.ts`)
- **Спавнер** — появление объектов по геолокации (`spawner.service.ts`), привязанных к позиции (lat/lon) и условиям
- **Лаборатория** — accessory-lab, крафтинг через UI
- **Вики** — описание предметов с иллюстрациями

### Units (Юниты)
- Привязаны к реальной геолокации (lat/lon)
- Условия активации: погода (rain, snow, overcast, clearsky), время суток (night, bluehour, goldhour, day), температура, ветер
- Уровни, статусы, классы юнитов

### Сервисный слой
- **AuthService** — авторизация (login/password), guards
- **ConnectorService** — типизированный HTTP-клиент (GET/POST с path-based routing)
- **StateService / GlobalService** — управление состоянием
- **UpdaterService** — real-time обновления
- **UxEventerService** — event bus для UX-событий

## Архитектура

```
hellgame24/src/app/
├── dashboard/           # Dashboard: карта, мессенджер, блог, статусы
│   ├── dash-map/        # Leaflet-карта с юнитами
│   ├── messanger/       # IM-мессенджер
│   ├── pager/           # Пагинация
│   └── user-module/     # Блог, статусы, почта, эмоции, уведомления
├── accessory/           # Крафтинг: инвентарь, рецепты, спавнер, вики, лаборатория
├── logs/                # Логи: тренды, глобальные события, логины, статусы
├── login/               # Авторизация
├── services/            # 15+ сервисов: auth, api, connector, state, units, blog, message...
├── models/              # TypeScript-модели: Unit, User, GlobalState, animations
└── menu/                # Навигация
```

## Стек технологий

| Технология | Назначение |
|-----------|-----------|
| Angular | SPA-фреймворк, lazy-loaded модули |
| TypeScript | Строгая типизация, интерфейсы, модели |
| Leaflet | Интерактивная карта с маркерами |
| RxJS | Reactive services, Observable-based API |
| Docker | Контейнеризация (Dockerfile + Nginx) |
| PHP backend | API: [hg24_back_php](https://github.com/exclusivelogin/hg24_back_php) |

## Связанные репозитории

| Репозиторий | Назначение |
|------------|-----------|
| [hg24_back_php](https://github.com/exclusivelogin/hg24_back_php) | PHP-бэкенд: accessory, blog, events, login, messaging, orders |
| [hg24bot](https://github.com/exclusivelogin/hg24bot) | Telegram-бот для игровых уведомлений |
| [hellgame](https://github.com/exclusivelogin/hellgame) | v1 — оригинальная версия (jQuery, PHP, GCM push) |

## Запуск

```bash
npm install
ng serve                    # localhost:4200

# Docker
docker build -t hellgame24 .
docker run -p 80:80 hellgame24
```
