import { createElement } from 'react';
import { useParams } from 'react-router';

import { Container } from '@/components/container';

import { ActiveChecklistProvider, useActiveChecklist } from './active-checklist-state';
import { Category } from './category';
import { Configuration } from './configuration';
import { ResetButton } from './reset-button';
import { Tabs } from './tabs';
import { Title } from './title';

/**
 * Checklist view.
 */
export function ChecklistView() {
  const { checklistId, tab } = useParams();

  return (
    <ActiveChecklistProvider value={{ checklistId, tab }}>
      <ResetButton />
      <Container className="checklist">
        <Tabs />
        <Title />

        {/* This Avoids to create the categories in another file and use the context. */}
        {createElement(function Categories() {
          const checklist = useActiveChecklist();

          return (
            <div className="categories">
              {checklist.categories.map((category) => (
                <Category key={category.id} category={category} />
              ))}
            </div>
          );
        })}

        <Configuration />
      </Container>
    </ActiveChecklistProvider>
  );
}
