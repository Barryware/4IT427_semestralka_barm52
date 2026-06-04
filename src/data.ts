import type { NavSection, Subject } from './types'

export const NAV_SECTIONS: NavSection[] = [
  { id: 'dashboard',  label: 'Dashboard',  icon: '⌂' },
  { id: 'ucebnice',   label: 'Učebnice',   icon: '▤' },
  { id: 'predmety',   label: 'Předměty',   icon: '◉' },
  { id: 'wiki',       label: 'Wiki',       icon: '◈' },
  { id: 'mapy',       label: 'Mapy',       icon: '⧉' },
  { id: 'shrnuti',    label: 'Shrnutí',    icon: '◆' },
  { id: 'trener',     label: 'Trenér',     icon: '✏' },
  { id: 'komise',     label: 'Komise',     icon: '◎' },
  { id: 'zdroje',     label: 'Zdroje',     icon: '▣' },
  { id: 'tipy',       label: 'Tipy',       icon: '💡' },
  { id: 'progress',   label: 'Progress',   icon: '★' },
]

export const SUBJECTS: Subject[] = [
  { id: '4SA310', label: 'IT Governance',                     file: '4SA310-it-governance.html',           ready: true,  priority: 'high' },
  { id: '4SA313', label: 'Bezpečnost informačních systémů',   file: '4SA313-bezpecnost-is.html',           ready: true,  priority: 'medium' },
  { id: '4SA415', label: 'Informační management',             file: '4SA415-informacni-management.html',   ready: true,  priority: 'medium' },
  { id: '4IT418', label: 'Řízení podnikové informatiky',      file: '4IT418-rizeni-podnikove-informatiky.html', ready: true, priority: 'high' },
  { id: '4SA418', label: 'Organizace a informace',            file: '4SA418-organizace-informace.html',    ready: true,  priority: 'high' },
  { id: '4SA420', label: 'Teorie systémů + informační etika', file: '4SA420-teorie-systemu-etika.html',    ready: true,  priority: 'medium' },
  { id: '4SA440', label: 'Sociální informatika',              file: '4SA440-socialni-informatika.html',    ready: true,  priority: 'high' },
  { id: '4SA513', label: 'Audit informačního systému',        file: '4SA513-audit-is.html',                ready: true,  priority: 'high' },
  { id: '4SA515', label: 'Řízení bezpečnosti IS / ISMS',      file: '4SA515-isms.html',                    ready: true,  priority: 'high' },
  { id: '4SA516', label: 'Project Governance + ERP',          file: '4SA516-project-governance-erp.html', ready: true,  priority: 'medium' },
  { id: '4SA540', label: 'Digitální forenzní analýza',        file: '4SA540-forenzni-analyza.html',        ready: true,  priority: 'high' },
  { id: '4SA551', label: 'Moderní řízení rizik',              file: '4SA551-rizeni-rizik.html',            ready: true,  priority: 'medium' },
]

export const MODULES = [
  { id: 'governance',  title: 'Governance & řízení IS/IT',          subjects: ['4SA310', '4IT418', '4SA415', '4SA513', '4SA516'] },
  { id: 'spolecnost',  title: 'Informační společnost',              subjects: ['4SA440', '4SA418', '4SA420'] },
  { id: 'audit',       title: 'Audit & kontrolní systémy IS',       subjects: ['4SA513'] },
  { id: 'procesy-erp', title: 'Procesy, architektury & ERP',        subjects: ['4SA516'] },
  { id: 'bezpecnost',  title: 'Bezpečnost & forenzní analýza',      subjects: ['4SA313', '4SA515', '4SA540', '4SA551'] },
]

export const EXAM_DATE = new Date('2026-06-03T10:00:00+02:00')
