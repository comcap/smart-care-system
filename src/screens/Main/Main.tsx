import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { SmartCare } from '../../types/smartCare';
import { Card } from '../../components/Card';
import { Input } from '../../components/Input';
import { Modal } from '../../components/Modal';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  loadStart,
  loadSucceeded,
  selectAllRequests,
  selectRequestsStatus,
} from '../../store/slices/smartCareSlice';
import { styles } from './Main.styles';

type Props = NativeStackScreenProps<RootStackParamList, 'Main'>;

export function Main({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectAllRequests);
  const status = useAppSelector(selectRequestsStatus);
  const [searchId, setSearchId] = useState('');
  const [searchErrorVisible, setSearchErrorVisible] = useState(false);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(loadStart());
      const timer = setTimeout(() => {
        dispatch(loadSucceeded(items));
      }, 300);
      return () => clearTimeout(timer);
    }
    return undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const handleSearch = () => {
    const trimmed = searchId.trim();
    if (!trimmed) {
      return;
    }
    const found = items.find(item => item.id === trimmed);
    if (found) {
      navigation.navigate('RequestDetail', { id: found.id });
    } else {
      setSearchErrorVisible(true);
    }
  };

  const renderItem = ({ item }: { item: SmartCare }) => (
    <Card
      testID={`main-card-item-${item.id}`}
      accessibilityLabel={`${item.id} ${item.title}`}
      onPress={() => navigation.navigate('RequestDetail', { id: item.id })}>
      <Text style={styles.itemId}>{item.id}</Text>
      <Text style={styles.itemTitle} numberOfLines={1}>
        {item.title}
      </Text>
    </Card>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Smart Care</Text>
        <TouchableOpacity
          testID="main-btn-add"
          accessibilityRole="button"
          accessibilityLabel="เพิ่ม Smart Care"
          style={styles.addButton}
          onPress={() => navigation.navigate('AddRequest')}>
          <Text style={styles.addButtonLabel}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchRow}>
        <View style={styles.searchInput}>
          <Input
            testID="main-input-search"
            label="ค้นหา"
            placeholder="กรอก Smart Care ID"
            value={searchId}
            onChangeText={setSearchId}
            onSubmitEditing={handleSearch}
          />
        </View>
        <TouchableOpacity
          testID="main-btn-search"
          accessibilityRole="button"
          accessibilityLabel="ค้นหา"
          style={styles.searchButton}
          onPress={handleSearch}>
          <Text style={styles.searchButtonLabel}>ค้นหา</Text>
        </TouchableOpacity>
      </View>

      {status === 'loading' ? (
        <View testID="main-loading" style={styles.centered}>
          <ActivityIndicator />
        </View>
      ) : items.length === 0 ? (
        <View testID="main-empty-state" style={styles.centered}>
          <Text style={styles.emptyText}>ยังไม่มี Smart Care</Text>
        </View>
      ) : (
        <FlatList
          testID="main-list"
          data={items}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
        />
      )}

      <Modal
        testID="main-modal-search-error"
        visible={searchErrorVisible}
        title="ไม่พบข้อมูล"
        message={`ไม่พบ Smart Care ID "${searchId.trim()}"`}
        confirmTestID="main-modal-btn-confirm"
        onConfirm={() => setSearchErrorVisible(false)}
      />
    </View>
  );
}
