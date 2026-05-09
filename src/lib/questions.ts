import fs from 'fs';
import path from 'path';

const QA_FILE     = path.join(process.cwd(), 'src', 'data', 'questions.json');
const CONSULT_FILE = path.join(process.cwd(), 'src', 'data', 'consultations.json');

/* ── 닉네임 자동 생성 ── */
const ADJ  = ['따뜻한','조용한','맑은','포근한','설레는','차분한','다정한','용감한','수줍은','환한'];
const NOUN = ['토끼','곰','여우','다람쥐','나비','달빛','별빛','솔바람','구름','이슬'];
export function generateNickname() {
    return `${ADJ[Math.floor(Math.random()*ADJ.length)]} ${NOUN[Math.floor(Math.random()*NOUN.length)]}`;
}

/* ── Q&A ── */
export interface Question {
    id: string;
    nickname: string;
    emotion: string;
    coloringSlug?: string;
    coloringTitle?: string;
    content: string;
    createdAt: string;
    answer?: string;
    answeredAt?: string;
    expertName?: string;
}

function readQ(): { questions: Question[] } {
    try { if (fs.existsSync(QA_FILE)) return JSON.parse(fs.readFileSync(QA_FILE,'utf-8')); }
    catch { /* ignore */ }
    return { questions: [] };
}
function writeQ(d: { questions: Question[] }) {
    try { fs.writeFileSync(QA_FILE, JSON.stringify(d, null, 2), 'utf-8'); }
    catch { console.log('[QA]', d); }
}

export function getQuestions(): Question[] { return readQ().questions; }
export function addQuestion(input: Pick<Question,'emotion'|'coloringSlug'|'coloringTitle'|'content'>): Question {
    const d = readQ();
    const q: Question = { ...input, id: Date.now().toString(), nickname: generateNickname(), createdAt: new Date().toISOString() };
    d.questions.unshift(q);
    writeQ(d);
    return q;
}

/* ── 상담 신청 ── */
export interface ConsultationRequest {
    id: string;
    name?: string;
    contact: string;
    subject: string;       // '본인' | '자녀'
    ageGroup?: string;
    concern: string;
    method: 'video' | 'chat' | 'any';
    availableTime: string;
    coloringSlug?: string;
    emotion?: string;
    createdAt: string;
    status: 'pending' | 'contacted' | 'completed';
}

function readC(): { requests: ConsultationRequest[] } {
    try { if (fs.existsSync(CONSULT_FILE)) return JSON.parse(fs.readFileSync(CONSULT_FILE,'utf-8')); }
    catch { /* ignore */ }
    return { requests: [] };
}
function writeC(d: { requests: ConsultationRequest[] }) {
    try { fs.writeFileSync(CONSULT_FILE, JSON.stringify(d, null, 2), 'utf-8'); }
    catch { console.log('[CONSULT]', d); }
}

export function getConsultations(): ConsultationRequest[] { return readC().requests; }
export function addConsultation(input: Omit<ConsultationRequest,'id'|'createdAt'|'status'>): ConsultationRequest {
    const d = readC();
    const r: ConsultationRequest = { ...input, id: Date.now().toString(), createdAt: new Date().toISOString(), status: 'pending' };
    d.requests.unshift(r);
    writeC(d);
    return r;
}
