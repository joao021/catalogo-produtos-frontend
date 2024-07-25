
# Catalogo de Produtos Allu

Catalogo Allu é uma aplicação Next.js que exibe informações de produtos para aluguel. Esta aplicação está configurada para desenvolvimento, construção e execução com Docker.

## Requisitos

Certifique-se de ter os seguintes softwares instalados em seu sistema:
- Docker
- Node.js (para desenvolvimento local)
- Yarn (opcional, mas recomendado)

## Configuração do Projeto

### 1. Clonar o Repositório

```bash
git clone https://github.com/joao021/catalogo-produtos-frontend
cd catalogo-produtos-frontend

```

### 2. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto e adicione suas variáveis de ambiente:

```env
# URL base para a API
CI=true (se for true ele testa com o mock, se for false chama a url original do API_URL)
API_URL=http://localhost:3001
```

### 3. Configurar Docker

O projeto está configurado para usar Docker para desenvolvimento e produção. Certifique-se de que o Docker está instalado e configurado em seu sistema.

### 4. Subir os Containers Docker

Para iniciar os containers Docker, execute:

```bash
docker-compose up --build
```

Isso irá construir e iniciar os serviços `app` conforme definido no arquivo `docker-compose.yml`.

### 5. Acessar a Aplicação

- A aplicação Next.js estará disponível em [http://localhost:5173](http://localhost:5173)



## Scripts Disponíveis

No `package.json`, os seguintes scripts estão disponíveis:

- `dev`: Inicia o servidor de desenvolvimento Next.js.
- `start`: Inicia o servidor Next.js em modo de produção.
- `build`: Compila a aplicação Next.js para produção.
- `lint`: Executa o ESLint para verificar o código.
- `test`: Executa os testes com Jest.
- `test:watch`: Executa os testes com Jest em modo watch.
