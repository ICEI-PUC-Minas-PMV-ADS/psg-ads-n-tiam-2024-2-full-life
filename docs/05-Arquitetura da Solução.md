# Arquitetura da Solução

<span style="color:red">Pré-requisitos: <a href="3-Projeto de Interface.md"> Projeto de Interface</a></span>
Definição de como o software é estruturado em termos dos componentes que fazem parte da solução e do ambiente de hospedagem da aplicação.
![Arquitetura da Solução](img/02-mob-arch.png)

## Diagrama de Classes
O diagrama de classes ilustra graficamente como será a estrutura do software, e como cada uma das classes da sua estrutura estarão interligadas. Essas classes servem de modelo para materializar os objetos que executarão na memória.
As referências abaixo irão auxiliá-lo na geração do artefato “Diagrama de Classes”.
> - [Diagramas de Classes - Documentação da IBM](https://www.ibm.com/docs/pt-br/rational-soft-arch/9.6.1?topic=diagrams-class)
> - [O que é um diagrama de classe UML? | Lucidchart](https://www.lucidchart.com/pages/pt/o-que-e-diagrama-de-classe-uml)

## Modelo Físico
Entregar um arquivo banco.sql contendo os scripts de criação das tabelas do banco de dados. Este arquivo deverá ser incluído dentro da pasta src\bd.

## Tecnologias Utilizadas
Descreva aqui qual(is) tecnologias você vai usar para resolver o seu problema, ou seja, implementar a sua solução. Liste todas as tecnologias envolvidas, linguagens a serem utilizadas, serviços web, frameworks, bibliotecas, IDEs de desenvolvimento, e ferramentas.
Apresente também uma figura explicando como as tecnologias estão relacionadas ou como uma interação do usuário com o sistema vai ser conduzida, por onde ela passa até retornar uma resposta ao usuário.

## Hospedagem
Explique como a hospedagem e o lançamento da plataforma foi feita.
> **Links Úteis**:
>
> - [Website com GitHub Pages](https://pages.github.com/)
> - [Programação colaborativa com Repl.it](https://repl.it/)
> - [Getting Started with Heroku](https://devcenter.heroku.com/start)
> - [Publicando Seu Site No Heroku](http://pythonclub.com.br/publicando-seu-hello-world-no-heroku.html)

## Qualidade de Software
 ### 1. Funcionalidade (Adequação Funcional)
    
a) Completude Funcional: O software deve cobrir todas as funcionalidades necessárias, como agendamento, visualização de horários, cancelamento e histórico de consultas.
* Métrica: Percentual de funcionalidades entregues com relação às planejadas (ex.: 90% das funcionalidades planejadas devem estar implementadas).
  
b) Correção Funcional: As funcionalidades implementadas devem cumprir com os requisitos e funcionar conforme o esperado.
* Métrica: Taxa de defeitos encontrados por funcionalidade ou por módulo (ex.: quantidade de bugs por função).
  
### 2. Confiabilidade
   
a) Tolerância a Falhas: O sistema deve continuar funcionando mesmo em caso de falhas menores, como falha na conexão de rede durante um agendamento.
* Métrica: Percentual de tempo de inatividade tolerado durante o uso (ex.: 99,5% de disponibilidade).
  
b) Maturidade: O número de falhas do sistema deve ser minimizado conforme o sistema amadurece.
* Métrica: Número médio de falhas por módulo por release.
  
### 3. Usabilidade
a) Apreensibilidade: Facilidade com que os usuários (pacientes e fisioterapeutas) conseguem aprender a usar o sistema, especialmente nas funcionalidades principais.
* Métrica: Tempo médio para um novo usuário realizar uma ação-chave (ex.: agendar uma consulta).
  
b) Operabilidade: O sistema deve ser fácil de operar, permitindo que os usuários executem suas tarefas de forma eficiente.
* Métrica: Percentual de usuários que conseguem completar uma tarefa sem assistência (ex.: 90% dos usuários completam o agendamento de consulta na primeira tentativa).

### 4. Desempenho
a) Tempo de resposta: A aplicação deve responder rapidamente às interações do usuário, como ao carregar uma agenda de horários.
* Métrica: Tempo médio de resposta de operações críticas (ex.: menos de 2 segundos para carregar os horários disponíveis).
  
b) Capacidade: O sistema deve ser capaz de lidar com uma quantidade crescente de usuários sem perda significativa de desempenho.
* Métrica: Número máximo de usuários simultâneos suportados sem queda de desempenho.

### 5. Segurança
a) Confidencialidade: As informações sensíveis, como dados médicos e pessoais, devem ser protegidas contra acessos não autorizados.
* Métrica: Percentual de tentativas de acesso bloqueadas com sucesso (ex.: 100% das tentativas não autorizadas são bloqueadas).

### 6. Manutenibilidade
a) Modularidade: O código do sistema deve ser modular, facilitando modificações e atualizações em áreas específicas.
* Métrica: Tamanho médio dos módulos ou classes e sua independência funcional (medido por acoplamento e coesão).
  
b) Facilidade de análise: A capacidade de diagnosticar e corrigir problemas ou realizar melhorias deve ser ágil.
* Métrica: Tempo médio para localizar e corrigir um defeito (ex.: tempo médio de correção de bugs).

### Justificativa das Subcaracterísticas Escolhidas

- Tempo e recursos limitados: A escolha de subcaracterísticas priorizou aspectos essenciais para um software de agendamento, como funcionalidade correta, desempenho adequado, segurança e facilidade de uso, aspectos críticos para qualquer software que lida com dados sensíveis e possui uma base de usuários ampla.

- Qualidade percebida pelo usuário: Usabilidade e desempenho são fundamentais para garantir uma boa experiência de uso. Já segurança é imprescindível para proteção de dados pessoais.

- Facilidade de manutenção: Subcaracterísticas de manutenibilidade ajudam a manter o software atualizado, corrigir problemas rapidamente e adicionar novas funcionalidades conforme o sistema evolui.
