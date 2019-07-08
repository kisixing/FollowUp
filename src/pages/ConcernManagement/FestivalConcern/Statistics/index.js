import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import StatisticSearch from './StatisticSearch';
import StatisticTable from './StatisticTable';

export default () => {
  return (
    <PageHeaderWrapper content={<StatisticSearch />}>
      <StatisticTable />
    </PageHeaderWrapper>
  );
};
