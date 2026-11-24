# Vereda Refúgio

Landing page conceitual de portfólio para o segmento de **Hospedagem e ecoturismo**. Marca, serviços e dados são fictícios.

**Demonstração:** Experiência de hospedagem demonstrativa. Não há envio de dados pessoais, sistema de cadastro ou pagamento.

## Rodar localmente

Requisitos: Node.js 22+ e npm.

```sh
npm ci
npm run dev
```

Abra http://localhost:3000 para ver a landing page.

## Publicar

O projeto usa Next.js App Router, TypeScript e exportação estática. `npm run build` gera `out/`.
Para GitHub Pages, em **Settings → Pages**, selecione **GitHub Actions**, então execute o fluxo “Publicar demonstração no GitHub Pages”. O fluxo configura o caminho público do repositório automaticamente.
Para Vercel, importe o repositório como projeto Next.js sem definir `PAGES_BASE_PATH`.

### Funil demonstrativo

A proposta vende uma escapada adaptada ao tempo da pessoa. Quem entra pode comparar cabanas, reconhecer a dificuldade das trilhas, conferir a estimativa e guardar o roteiro no próprio navegador. Só três números opcionais (índices da cabana e da rota, noites) ficam no armazenamento local; a pessoa pode retomar ou apagar quando quiser. Não há formulário de contato, cotação ou reserva real.

Experimento futuro: mostrar o custo total ou primeiro o custo por noite. Num teste moderado, observar qual versão ajuda a escolher a cabana sem confundir preço da estadia com preço de diária. Nenhuma coleta está instalada.
