I GEAR GEEK : Vending Machine Problem 
===

Start with Node.js Enviromment
```cmd
npm install
npm start
```

Product API 
---

| API | Endpoint | Method |  Body  |
|-----|----------|--------|--------|
|get all product|http://13.67.70.169:8085/product|GET| -
|get product by id |http://13.67.70.169:8085/product/:productId|GET| -
|buy product|http://13.67.70.169:8085/product/buy|POST| {coinList: [10,10,5], productId: 1}

DEMO : http://13.67.70.169:8085/
