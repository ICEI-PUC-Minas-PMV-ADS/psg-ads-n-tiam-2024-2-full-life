
## Personas

Tereza de Jesus tem 68 anos, é aposentada e viúva. É uma pessoa aventureira, que gosta de manter-se ativa e realizar atividades físicas no dia a dia. Agora, está buscando uma plataforma simples e fácil de usar para agendar suas consultas de fisioterapia, facilitando o cuidado com seu bem-estar físico.

Augusto Farfus tem 19 anos, é atleta e universitário. É uma pessoa que busca evoluir profissionalmente buscando o melhor rendimento possível nos esportes praticados. Agora, está buscando um aplicativo que oferece diversas funcionalidades de fisioterapia: agendamento de exames, acompanhamento da sua evolução, indicações de exercícios e contato mais próximo com o profissional.

Nicole Catarina tem 26 anos, é economista. É uma pessoa sedentária. Agora, preocupada com a sua saúde na terceira idade, está buscando serviços de fisioterapia onde há recomendações de exercícios físicos junto com acompanhamento de um profissional. 

André Luiz, 37 anos, é motoboy e possui um histórico de acidentes de motocicleta, o que resultou em várias fraturas e limitações articulares. Agora, ele busca um aplicativo que ofereça serviços de fisioterapia para ajudá-lo a recuperar seus movimentos e retornar ao trabalho como entregador.

## Histórias de Usuários

Com base na análise das personas forma identificadas as seguintes histórias de usuários:

|EU COMO... `PERSONA`| QUERO/PRECISO ... `FUNCIONALIDADE` |PARA ... `MOTIVO/VALOR`                 |
|--------------------|------------------------------------|----------------------------------------|
|Fisioterapeuta  | Gerenciar as consultas       |     Organizar de forma eficiente as consultas dos clientes na minha clínica de fisioterapia      |
|Tereza de Jesus       | Realizar marcações de consultas               | Facilitar o agendamento e acompanhamento das minhas sessões de fisioterapia  |
|Augusto Farfus | Consultar o meu histórico de consultas | Para acompanhar a minha evolução nas atividades físicas | 
|Nicole Catarina | Recomendações de exercícios físicos | Para realizar atividades físicas de acordo com as recomendações feita por um fisioterapeuta de acordo com o resultado das consultas |
| André Luiz | Realizar marcações de consultas | Facilitar o agendamento e acompanhamento das minhas sessões de fisioterapia para acompanhar a minha recuperação  |


## Requisitos

### Requisitos Funcionais

|ID    | Descrição do Requisito  | Prioridade |
|------|-----------------------------------------|----|
|RF-001| Permitir que o usuário faça agendamento de consultas | ALTA | 
|RF-002| Permitir que o usuário acompanhe o andamento das suas consultas   | MÉDIA |
|RF-003| Permitir que o usuário visualize os exercícios físicos recomendados pelo fisioterapeuta  | BAIXA |
|RF-004| Permitir que o fisioterapeuta visualize os dados do paciente | MÉDIA |
|RF-005| Permitir que o usuário anexa exames  | BAIXA |
|RF-006| Permitir que o usuário visualize a sua evolução após a consulta | MÉDIA |
|RF-007| Permitir que o fisioterapeuta visualize todas as consultas marcadas | ALTA |
|RF-008| Permitir que o usuário visualize os dias disponíveis da agenda do fisioterapeuta | ALTA |
|RF-009| Permitir que o usuário ou o fisioterapeuta faça cancelamento da consulta | MÉDIA |
|RF-010| Permitir que o usuário faça um cadastro no aplicativo | MÉDIA |


### Requisitos não Funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001| O sistema deve ser responsivo para rodar em um dispositivos móvel | MÉDIA | 
|RNF-002| Deve processar requisições do usuário em no máximo 3s |  BAIXA | 


## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|01| O projeto deverá ser entregue até o final do semestre |
|02| Não pode ser desenvolvido um módulo de backend        |

Enumere as restrições à sua solução. Lembre-se de que as restrições geralmente limitam a solução candidata.

> **Links Úteis**:
> - [O que são Requisitos Funcionais e Requisitos Não Funcionais?](https://codificar.com.br/requisitos-funcionais-nao-funcionais/)
> - [O que são requisitos funcionais e requisitos não funcionais?](https://analisederequisitos.com.br/requisitos-funcionais-e-requisitos-nao-funcionais-o-que-sao/)

## Diagrama de Casos de Uso

O diagrama de casos de uso é o próximo passo após a elicitação de requisitos, que utiliza um modelo gráfico e uma tabela com as descrições sucintas dos casos de uso e dos atores. Ele contempla a fronteira do sistema e o detalhamento dos requisitos funcionais com a indicação dos atores, casos de uso e seus relacionamentos. 

As referências abaixo irão auxiliá-lo na geração do artefato “Diagrama de Casos de Uso”.

> **Links Úteis**:
> - [Criando Casos de Uso](https://www.ibm.com/docs/pt-br/elm/6.0?topic=requirements-creating-use-cases)
> - [Como Criar Diagrama de Caso de Uso: Tutorial Passo a Passo](https://gitmind.com/pt/fazer-diagrama-de-caso-uso.html/)
> - [Lucidchart](https://www.lucidchart.com/)
> - [Astah](https://astah.net/)
> - [Diagrams](https://app.diagrams.net/)


# Gerenciamento de Projeto

De acordo com o PMBoK v6 as dez áreas que constituem os pilares para gerenciar projetos, e que caracterizam a multidisciplinaridade envolvida, são: Integração, Escopo, Cronograma (Tempo), Custos, Qualidade, Recursos, Comunicações, Riscos, Aquisições, Partes Interessadas. Para desenvolver projetos um profissional deve se preocupar em gerenciar todas essas dez áreas. Elas se complementam e se relacionam, de tal forma que não se deve apenas examinar uma área de forma estanque. É preciso considerar, por exemplo, que as áreas de Escopo, Cronograma e Custos estão muito relacionadas. Assim, se eu amplio o escopo de um projeto eu posso afetar seu cronograma e seus custos.

## Gerenciamento de Tempo

Com diagramas bem organizados que permitem gerenciar o tempo nos projetos, o gerente de projetos agenda e coordena tarefas dentro de um projeto para estimar o tempo necessário de conclusão.

![Diagrama de rede simplificado notação francesa (método francês)](img/02-diagrama-rede-simplificado.png)

O gráfico de Gantt ou diagrama de Gantt também é uma ferramenta visual utilizada para controlar e gerenciar o cronograma de atividades de um projeto. Com ele, é possível listar tudo que precisa ser feito para colocar o projeto em prática, dividir em atividades e estimar o tempo necessário para executá-las.

![Gráfico de Gantt](img/02-grafico-gantt.png)

## Gerenciamento de Equipe

O gerenciamento adequado de tarefas contribuirá para que o projeto alcance altos níveis de produtividade. Por isso, é fundamental que ocorra a gestão de tarefas e de pessoas, de modo que os times envolvidos no projeto possam ser facilmente gerenciados. 

![Simple Project Timeline](img/02-project-timeline.png)

## Gestão de Orçamento

O processo de determinar o orçamento do projeto é uma tarefa que depende, além dos produtos (saídas) dos processos anteriores do gerenciamento de custos, também de produtos oferecidos por outros processos de gerenciamento, como o escopo e o tempo.

![Orçamento](img/02-orcamento.png)
