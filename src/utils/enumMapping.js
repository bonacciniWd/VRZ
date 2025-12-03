// Bidirectional mapping between Portuguese (DB) and English (Code) enums
// DB uses Portuguese for direct queries and reports
// Code uses English for international conventions

// ==================== PROPOSAL STATUS ====================
export const PROPOSAL_STATUS = {
  // Code → DB
  draft: 'rascunho',
  sent: 'enviada',
  approved: 'aprovada',
  rejected: 'rejeitada',
  
  // DB → Code (reverse)
  rascunho: 'draft',
  enviada: 'sent',
  aprovada: 'approved',
  rejeitada: 'rejected',
};

export const mapProposalStatus = {
  toDB: (status) => PROPOSAL_STATUS[status] || status,
  fromDB: (status) => PROPOSAL_STATUS[status] || status,
};

// ==================== TICKET STATUS ====================
export const TICKET_STATUS = {
  // Code → DB
  open: 'aberto',
  in_progress: 'em_andamento',
  resolved: 'resolvido',
  closed: 'fechado',
  
  // DB → Code (reverse)
  aberto: 'open',
  em_andamento: 'in_progress',
  resolvido: 'resolved',
  fechado: 'closed',
};

export const mapTicketStatus = {
  toDB: (status) => TICKET_STATUS[status] || status,
  fromDB: (status) => TICKET_STATUS[status] || status,
};

// ==================== TICKET PRIORITY ====================
export const TICKET_PRIORITY = {
  // Code → DB
  low: 'baixa',
  normal: 'media',
  high: 'alta',
  urgent: 'urgente',
  
  // DB → Code (reverse)
  baixa: 'low',
  media: 'normal',
  alta: 'high',
  urgente: 'urgent',
};

export const mapTicketPriority = {
  toDB: (priority) => TICKET_PRIORITY[priority] || priority,
  fromDB: (priority) => TICKET_PRIORITY[priority] || priority,
};

// ==================== PAYMENT STATUS ====================
export const PAYMENT_STATUS = {
  // Code → DB
  pending: 'pendente',
  processing: 'processando',
  paid: 'pago',
  failed: 'falhou',
  refunded: 'reembolsado',
  canceled: 'cancelado',
  
  // DB → Code (reverse)
  pendente: 'pending',
  processando: 'processing',
  pago: 'paid',
  falhou: 'failed',
  reembolsado: 'refunded',
  cancelado: 'canceled',
};

export const mapPaymentStatus = {
  toDB: (status) => PAYMENT_STATUS[status] || status,
  fromDB: (status) => PAYMENT_STATUS[status] || status,
};

// ==================== PROJECT STEP STATUS ====================
export const STEP_STATUS = {
  // Code → DB
  pending: 'pendente',
  in_progress: 'em_andamento',
  completed: 'concluido',
  
  // DB → Code (reverse)
  pendente: 'pending',
  em_andamento: 'in_progress',
  concluido: 'completed',
};

export const mapStepStatus = {
  toDB: (status) => STEP_STATUS[status] || status,
  fromDB: (status) => STEP_STATUS[status] || status,
};

// ==================== ROOM TYPE (messages) ====================
export const ROOM_TYPE = {
  // Code → DB (assuming DB uses Portuguese)
  global: 'global',
  proposal: 'proposta',
  ticket: 'ticket',
  
  // DB → Code
  proposta: 'proposal',
};

export const mapRoomType = {
  toDB: (type) => ROOM_TYPE[type] || type,
  fromDB: (type) => ROOM_TYPE[type] || type,
};

// ==================== NOTIFICATION TYPE ====================
export const NOTIFICATION_TYPE = {
  // Code → DB
  proposal_status: 'status_proposta',
  proposal_invite: 'convite_proposta',
  payment_confirmed: 'pagamento_confirmado',
  payment_failed: 'pagamento_falhou',
  ticket_update: 'atualizacao_ticket',
  ticket_reply: 'resposta_ticket',
  
  // DB → Code
  status_proposta: 'proposal_status',
  convite_proposta: 'proposal_invite',
  pagamento_confirmado: 'payment_confirmed',
  pagamento_falhou: 'payment_failed',
  atualizacao_ticket: 'ticket_update',
  resposta_ticket: 'ticket_reply',
};

export const mapNotificationType = {
  toDB: (type) => NOTIFICATION_TYPE[type] || type,
  fromDB: (type) => NOTIFICATION_TYPE[type] || type,
};

// ==================== HELPER FUNCTIONS ====================

/**
 * Transform object with enum fields from code (EN) to DB (PT)
 * @param {Object} obj - Object with enum fields
 * @param {Object} mappings - Key-value pairs of {field: mapper}
 * @returns {Object} Transformed object
 * 
 * @example
 * const ticket = { status: 'open', priority: 'high' };
 * const dbTicket = mapObjectToDB(ticket, {
 *   status: mapTicketStatus,
 *   priority: mapTicketPriority
 * });
 * // => { status: 'aberto', priority: 'alta' }
 */
export function mapObjectToDB(obj, mappings) {
  if (!obj) return obj;
  const result = { ...obj };
  for (const [field, mapper] of Object.entries(mappings)) {
    if (result[field] !== undefined) {
      result[field] = mapper.toDB(result[field]);
    }
  }
  return result;
}

/**
 * Transform object with enum fields from DB (PT) to code (EN)
 * @param {Object} obj - Object with enum fields
 * @param {Object} mappings - Key-value pairs of {field: mapper}
 * @returns {Object} Transformed object
 * 
 * @example
 * const dbTicket = { status: 'aberto', priority: 'alta' };
 * const ticket = mapObjectFromDB(dbTicket, {
 *   status: mapTicketStatus,
 *   priority: mapTicketPriority
 * });
 * // => { status: 'open', priority: 'high' }
 */
export function mapObjectFromDB(obj, mappings) {
  if (!obj) return obj;
  const result = { ...obj };
  for (const [field, mapper] of Object.entries(mappings)) {
    if (result[field] !== undefined) {
      result[field] = mapper.fromDB(result[field]);
    }
  }
  return result;
}

/**
 * Transform array of objects from DB (PT) to code (EN)
 * @param {Array} arr - Array of objects
 * @param {Object} mappings - Key-value pairs of {field: mapper}
 * @returns {Array} Transformed array
 */
export function mapArrayFromDB(arr, mappings) {
  if (!Array.isArray(arr)) return arr;
  return arr.map(obj => mapObjectFromDB(obj, mappings));
}

/**
 * Transform array of objects from code (EN) to DB (PT)
 * @param {Array} arr - Array of objects
 * @param {Object} mappings - Key-value pairs of {field: mapper}
 * @returns {Array} Transformed array
 */
export function mapArrayToDB(arr, mappings) {
  if (!Array.isArray(arr)) return arr;
  return arr.map(obj => mapObjectToDB(obj, mappings));
}
