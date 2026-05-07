# QA Automation E2E – SauceDemo (Playwright)

[![Playwright Tests](https://github.com/axel-ganum/playwright-e2e-saucedemo/actions/workflows/playwright.yml/badge.svg)](https://github.com/axel-ganum/playwright-e2e-saucedemo/actions)


## Overview
Proyecto de automatización end-to-end (E2E) para un flujo completo de compra en SauceDemo, utilizando Playwright con TypeScript y aplicando el patrón Page Object Model (POM).

El objetivo es validar los principales flujos de negocio de un e-commerce, asegurando estabilidad, mantenibilidad y escalabilidad en los tests.

---

## Tech Stack
- Playwright
- TypeScript
- Node.js
- Page Object Model (POM)
- GitHub Actions (CI/CD)

---

## Test Coverage

...
### End-to-End
- Flujo completo: login → selección de producto → checkout → confirmación

---

## Test Strategy

La automatización prioriza los flujos críticos del e-commerce, enfocándose en escenarios de mayor impacto para el usuario:

- autenticación
- gestión de carrito
- checkout
- finalización de compra

Se incluyen validaciones positivas y negativas para garantizar el comportamiento esperado tanto en flujos exitosos como ante errores de usuario.

Los tests fueron diseñados para ser:

- independientes
- reutilizables
- mantenibles
- resistentes a flakiness

---


### Autenticación
- Login con credenciales válidas
- Validación de errores en login

### Carrito
- Agregar productos
- Visualización en carrito

### Checkout
- Completar formulario correctamente
- Validaciones de campos obligatorios:
  - First Name
  - Last Name
  - Postal Code
- Visualización de productos en overview
- Cancelación de checkout
- Finalización de compra

### End-to-End
- Flujo completo: login → selección de producto → checkout → confirmación

---

## Arquitectura

El proyecto sigue el patrón **Page Object Model (POM)**:

```
.
├── pages/
├── tests/
├── test-results/
├── playwright.config.ts
```

### Beneficios
- Reutilización de código
- Mantenimiento sencillo
- Tests más legibles
- Separación de responsabilidades

---

## Instalación

```bash
npm install
npx playwright install
```

---

## Ejecución de tests

```bash
npx playwright test
```

### Modos adicionales

```bash
# Modo visual
npx playwright test --headed

# Modo debug
npx playwright test --debug
```

---

## Buenas prácticas implementadas
- Selectores estables (`data-test`)
- Assertions robustas
- Tests independientes
- Manejo correcto de asincronía
- Validación de UI y lógica de negocio
- Reducción de flakiness

---

## Negative Testing

La suite incluye escenarios negativos para validar el comportamiento de la aplicación ante entradas inválidas y errores de usuario:

- Login inválido
- Checkout incompleto
- Validación de campos obligatorios
- Restricción de avance con datos faltantes

---

## CI/CD
Integración con GitHub Actions para ejecutar tests automáticamente en cada push y pull request.

Pipeline:
- Instalación de dependencias
- Instalación de browsers
- Ejecución de tests
- Generación de reportes

---

## Estado del proyecto
- Tests E2E implementados
- Flujo de compra validado
- Arquitectura POM aplicada
- Suite estable

---

## Posibles mejoras
- Reportes avanzados
- Tests cross-browser
- Data-driven testing
- Mocking de APIs
- Paralelización en CI

---

## Autor
Axel Ganum

---

## Notas
Proyecto enfocado en automatización E2E aplicando buenas prácticas de QA Automation utilizadas en entornos reales.