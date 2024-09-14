
# Metodologia
Para desenvolver o software de agendamento de consultas de fisioterapia, a equipe usou uma metodologia de trabalho bem definida, dividida em pequenos blocos de atividades.

Planejamento e Definição de Requisitos

- Reuniões de Kickoff: Realizar reuniões iniciais na sala de aula, e grupo no whatsapp para discutir sobre a ferramenta e entrevista com o usuário.
- Documentação de Requisitos: Separada e organizada com a escala de priodade dos requisitos funcionais e não funcionais.
  
Design e Arquitetura

- Definição de arquitetura do sistema.
- Criação de design e interface.
- Criação de wireframes e protótipos.
  
Desenvolvimento

- Desenvolvimento Ágil
- Metodologia SCRUM.
- Programação e Implementação.

Testes e Garantia de Qualidade

- Testes Automatizados
- Testes Unitários
- Testes de Integração
- Testes de Interface
- Testes Manuais
- Testes de Usabilidade
- Testes de Aceitação

Preparação para Implantação:

- Ambiente de Produção
- Planejamento de Lançamento
- Implantar
- Implementação Gradual
- Manutenção e Suporte

Suporte Pós-Lançamento:

- Monitoramento: Monitorar o sistema
- Correções e Atualizações
- Evolução do Produto
- Planejamento de Novas Funcionalidades

Ambientes de Desenvolvimento e Teste:

- Ambientes Locais
- Ambientes de Teste
  
Gestão de Código Fonte

- Controle de versão: Git, com repositório
- Modelos de ramificação: Git Flow

Gestão de Projetos e Times:

- Ferramentas de Gestão de Projetos
- Comunicação via Whatsapp
- Documentação



## Relação de Ambientes de Trabalho
[Documento15.pdf](https://github.com/user-attachments/files/17000789/Documento15.pdf)



## Controle de Versão

A ferramenta de controle de versão adotada no projeto foi o
[Git](https://git-scm.com/), sendo que o [Github](https://github.com)
foi utilizado para hospedagem do repositório.

Gerência de Branches

- `main`: versão estável já testada do software
- `release`: versão já testada do software, porém instável
- `testing`: versão em testes do software
- `dev`: versão de desenvolvimento do software
- `feature\<feature-name>`: desenvolvimento de uma nova funcionalidade

Gerência de Issues

- `documentation`: melhorias ou acréscimos à documentação
- `bug`: uma funcionalidade encontra-se com problemas
- `enhancement`: uma funcionalidade precisa ser melhorada
- `feature`: uma nova funcionalidade precisa ser introduzida

Gerência de Tags

Para o padrão de nomenclatura das tags no projeto, usaremos:

- `Formato: vX.0.0 (ex: v1.0.0)` Versões principais: Mudanças significativas e incompatíveis com versões anteriores.
        
- `Formato: vX.Y.0 (ex: v1.1.0)` Versões secundárias: Adicionam funcionalidades de forma retrocompatível.
        
- `Formato: vX.Y.Z (ex: v1.1.1)` Correções de bugs: Corrige falhas sem impactar a compatibilidade.
        

Commits e Merges
- Commits: Cada alteração significativa no código é acompanhada por um commit claro e descritivo, seguindo os padrões de commit semântico.
- Merges: Integrações de branches são realizadas utilizando merges, preferencialmente via pull requests no GitHub, garantindo revisões de código antes da integração.

### Divisão de Papéis

A equipe está organizada da seguinte maneira:
- Scrum Master: Yago Henrique;
- Product Owner: Guilherme Henrique;
- Equipe de Desenvolvimento: Yago Henrique, Guilherme Henrique, Tibério Silva, Bernardo Rodrigues, Luan Pablo;
- Equipe de Design: Luan Pablo.

### Processo
A implementação do Scrum pelo grupo envolve o uso de um recurso de gerenciamento de projeto oferecido pelo GitHub, que auxilia na visualização do progresso e na organização das tarefas. Aqui estão os principais aspectos a serem considerados no processo:

- Sprint Planning: As Sprints são planejadas com base nos requisitos e nas prioridades do projeto. O backlog é atualizado no GitHub Projects, onde as tarefas são divididas em issues.

- Daily Stand-ups: O grupo realiza reuniões diárias (stand-ups) para acompanhar o progresso e resolver impedimentos rapidamente. As atualizações podem ser feitas no GitHub para manter o time alinhado com o que foi discutido.

- Task Tracking: As issues no GitHub são atribuídas a diferentes membros do time, com rótulos indicando o estágio (to-do, in-progress, done). Cada tarefa acompanha uma descrição clara dos critérios de aceitação.

- Sprint Reviews e Retrospectives: No final de cada Sprint, o progresso é revisado, e as tarefas concluídas são analisadas em conjunto com o status geral do projeto. Feedback é capturado e ajustes são feitos na próxima Sprint com base na retrospectiva.

Esse processo garante uma boa visibilidade do progresso do projeto, e uma boa comunicação entre os membros e uma metodologia ágil de resolução de problemas.

 (Processo Coloque informações sobre detalhes da implementação do Scrum seguido pelo grupo. O grupo deverá fazer uso do recurso de gerenciamento de projeto oferecido pelo GitHub, que permite acompanhar o andamento do projeto, a execução das tarefas e o status de desenvolvimento da solução.)
> **Links Úteis**:
> - [Planejamento e Gestáo Ágil de Projetos](https://pucminas.instructure.com/courses/87878/pages/unidade-2-tema-2-utilizacao-de-ferramentas-para-controle-de-versoes-de-software)
> - [Sobre quadros de projeto](https://docs.github.com/pt/issues/organizing-your-work-with-project-boards/managing-project-boards/about-project-boards)
> - [Project management, made simple](https://github.com/features/project-management/)
> - [Sobre quadros de projeto](https://docs.github.com/pt/github/managing-your-work-on-github/about-project-boards)
> - [Como criar Backlogs no Github](https://www.youtube.com/watch?v=RXEy6CFu9Hk)
> - [Tutorial Slack](https://slack.com/intl/en-br/)

### Ferramentas

As ferramentas empregadas no projeto são:

- Visual Studio Code
- Whatsapp
- Figma

O visual studio code foi escolhido porque ele possui uma integração com o sistema de versão. As ferramentas de comunicação utilizadas possuem integração semelhante e por isso foram selecionadas. Por fim, para criar diagramas utilizamos o figma por melhor captar as necessidades da nossa solução.
