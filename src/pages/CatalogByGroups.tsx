import { useEffect, useState, useMemo } from 'react';

import {
  GroupManager,
  GroupManagerForm,
  GroupTree,
  ProductsASGList,
} from '@/components/base';
import {
  CreateGroupButton,
  PageContainer,
  PageWrap,
  Popup,
  Sidebar,
} from '@/components/ui';

import { buildGroupsTree, serverApi } from '@/utils';
import { useGroups } from '@/hooks/useGroups';
import { addGroup, deleteGroup, updateGroup } from '@/redux/group/groupSlice';
import { useAppDispatch } from '@/redux/hooks';

export default function CatalogByGroupsPage() {
  const dispatch = useAppDispatch();

  const { groups, isLoading } = useGroups();

  // Дерево перестроится автоматически ТОЛЬКО если изменится массив groups.
  const tree = useMemo(() => {
    return buildGroupsTree(groups);
  }, [groups]);

  const [selectedGroup, setSelectedGroup] = useState<IGroup | null>(null);

  const [products, setProducts] = useState<IProductASG[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loadingSearchProducts, setLoadingSearchProducts] =
    useState<boolean>(false);

  const [errorSearchProducts, setErrorSearchProducts] = useState<string | null>(
    null
  );

  const hasData = products.length > 0;

  useEffect(() => {
    const fetchData = async ({ _id }: IGroup) => {
      try {
        setLoadingSearchProducts(true);
        setErrorSearchProducts(null);

        const { data } = await serverApi.get(
          `/cms-catalog/product-by-group?id=${_id}&page=${currentPage}`
        );

        if (currentPage === 1) {
          setTotalPages(data.totalPages);
        }

        setProducts(data.products);
      } catch (error) {
        console.log('error', error);
        setErrorSearchProducts('error');
      } finally {
        setLoadingSearchProducts(false);
      }
    };

    if (!selectedGroup && groups.length > 0) {
      const firstGroup = tree[0];

      setSelectedGroup(firstGroup);

      fetchData(firstGroup);
    } else {
      if (selectedGroup !== null) {
        fetchData(selectedGroup);
      }
    }
  }, [groups, tree, selectedGroup, currentPage]);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onClose = () => setIsOpen(false);

  const handleAddGroupLocal = (newGroup: IGroup) => {
    dispatch(addGroup(newGroup));
    setSelectedGroup(newGroup);
    // Tree обновится само благодаря useMemo
  };

  const handleUpdateGroupLocal = (updatedGroup: IGroup) => {
    dispatch(updateGroup(updatedGroup));

    // Если редактируемая группа была выбрана, обновляем и её
    if (selectedGroup?._id === updatedGroup._id) {
      setSelectedGroup(updatedGroup);
    }
  };

  const handleDeleteGroupLocal = (id: string, parentGroup: IGroup | null) => {
    dispatch(deleteGroup(id));

    if (selectedGroup?._id === id) setSelectedGroup(parentGroup);
  };

  return (
    <>
      <h1 className="visually-hidden">Products by groups Page</h1>

      <PageWrap>
        <div>
          <Sidebar padding={24} paddingBottom={100}>
            <CreateGroupButton setIsOpen={setIsOpen} />
            <Popup
              open={isOpen}
              onClose={onClose}
              title="Создать группу"
              maxWidth="md"
            >
              <GroupManagerForm
                groups={groups}
                onClose={onClose}
                onGroupAdded={handleAddGroupLocal}
                onUpdateGroup={handleUpdateGroupLocal}
              />
            </Popup>

            <GroupTree
              groups={groups}
              loading={isLoading}
              // loading={loading}
              tree={tree} // Сюда пойдет уже вычисленное через useMemo дерево
              selectedGroup={selectedGroup}
              onSelectGroup={setSelectedGroup}
            />
          </Sidebar>
        </div>

        <PageContainer>
          {selectedGroup && (
            <>
              <GroupManager
                group={selectedGroup}
                groups={groups}
                onUpdateGroup={handleUpdateGroupLocal}
                onGroupAdded={handleAddGroupLocal}
                onDeleteGroup={handleDeleteGroupLocal}
                hasData={hasData}
              />
              <ProductsASGList
                products={products}
                setProducts={setProducts}
                hasData={hasData}
                loadingSearchProducts={loadingSearchProducts}
                errorSearchProducts={errorSearchProducts}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
              />
            </>
          )}
        </PageContainer>
      </PageWrap>
    </>
  );
}
