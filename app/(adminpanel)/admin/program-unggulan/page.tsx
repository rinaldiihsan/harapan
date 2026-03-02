import type { Metadata } from 'next';
import ProgramUnggulanClient from './ProgramUnggulanClient';

export const metadata: Metadata = {
  title: 'Program Unggulan',
};

export default function ProgramUnggulanPage() {
  return <ProgramUnggulanClient />;
}
