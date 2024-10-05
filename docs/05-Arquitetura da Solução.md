# Arquitetura da Solução
## Requisitos Funcionais

* RF-001	Permitir que o usuário faça agendamento de consultas	
* RF-002	Permitir que o usuário acompanhe o andamento de suas consultas	
* RF-003	Permitir que o usuário visualize os exercícios físicos recomendados pelo fisioterapeuta	
* RF-004	Permitir que o fisioterapeuta visualize os dados do paciente	
* RF-005	Permitir que o usuário anexa exames	
* RF-006	Permitir que o usuário visualize sua evolução após a consulta	
* RF-007	Permitir que o fisioterapeuta visualize todas as consultas marcadas	
* RF-008	Permitir que o usuário visualize os dias disponíveis da agenda do fisioterapeuta	
* RF-009	Permitir que o usuário ou o fisioterapeuta faça cancelamento da consulta	
* RF-010	Permitir que o usuário faça um cadastro no aplicativo	

## Requisitos não Funcionais

* RNF-001	O sistema deve ser responsivo para rodar em um dispositivo móvel	
* RNF-002	Deve processar os agendamentos no máximo 10 segundos	
* RNF-003	O sistema deve garantir que todos os dados estejam em conformidade com a LGPD (Lei Geral de Proteção de Dados)	
* RNF-004	O sistema deve suportar até 500 usuários simultâneos sem manipulação significativa de desempenho	
  
## Restrições

* 01	O projeto deverá ser entregue até o final do semestre
* 02	Não pode ser desenvolvido fora do escopo mobile
* 03	O projeto deverá ter um banco de dados em nuvem
* 04	Todos os membros devem ter conhecimentos de tecnologias aplicadas
* 05	O projeto deve seguir a documentação

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

