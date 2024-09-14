
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

Os artefatos do projeto são desenvolvidos a partir de diversas plataformas e a relação dos ambientes com seu respectivo propósito deverá ser apresentada em uma tabela que especifica que detalha Ambiente, Plataforma e Link de Acesso. 
Nota: Vide documento modelo do estudo de caso "Portal de Notícias" e defina também os ambientes e frameworks que serão utilizados no desenvolvimento de aplicações móveis.

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

Coloque  informações sobre detalhes da implementação do Scrum seguido pelo grupo. O grupo deverá fazer uso do recurso de gerenciamento de projeto oferecido pelo GitHub, que permite acompanhar o andamento do projeto, a execução das tarefas e o status de desenvolvimento da solução.
 
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
