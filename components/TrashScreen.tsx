import { Task } from '@/types/Task';
import { useTheme } from '@contexts/context';
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import InfoHeader from '@components/HeaderInfo';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface TrashScreenProps {
  tasks?: Task[];
  onRestore: (id: string) => void;
  onDeleteForever?: (id: string) => void;
}

const TrashScreen: React.FC<TrashScreenProps> = ({
  tasks = [],
  onRestore,
  onDeleteForever,
}) => {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.background, paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      {/* Header */}
      <InfoHeader title="Thùng rác" icon="trash" />

      {/* Content */}
      {tasks.length === 0 ? (
        <View style={styles.emptyBox}>
          <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
            Không hoàn thành task chứ không phải mình sạch đâu nhé 🤐
          </Text>
          <Image
            source={require('../assets/images/memeclean.jpg')}
            style={{ width: 200, height: 200, marginTop: 20, resizeMode: 'contain' }}
          />
        </View>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 24 }}
          renderItem={({ item }) => (
            <View style={[styles.cardModern, { backgroundColor: colors.surface }] }>
              <View style={styles.textBlock}>
                <Text style={[styles.taskTitle, { color: colors.text }]} numberOfLines={2}>
                  {item.title}
                </Text>
                {item.description ? (
                  <Text style={[styles.taskDesc, { color: colors.textSecondary }]} numberOfLines={3}>
                    {item.description}
                  </Text>
                ) : null}
                {/* Meta + Actions */}
                <View style={styles.metaRow}>
                  <Text style={[styles.taskMeta, { color: colors.textSecondary }]}>
                    🗓 {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : '-'}
                  </Text>
                  <View style={styles.actionsRow}>
                    <TouchableOpacity
                      onPress={() => onRestore(item.id)}
                      style={[styles.restoreBtnSmall, { backgroundColor: colors.primary }]}
                      activeOpacity={0.8}
                    >
                      <MaterialIcons name="restore" size={16} color="#fff" />
                      <Text style={styles.restoreTextSmall}>Khôi phục</Text>
                    </TouchableOpacity>
                    {onDeleteForever && (
                      <TouchableOpacity
                        onPress={() => onDeleteForever(item.id)}
                        style={[styles.deleteBtnSmall, { backgroundColor: colors.danger || '#e53935' }]}
                        activeOpacity={0.8}
                      >
                        <MaterialIcons name="delete-forever" size={16} color="#fff" />
                        <Text style={styles.deleteTextSmall}>Xóa</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default TrashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  emptyBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  cardModern: {
    backgroundColor: '#fff',
    borderRadius: 14,
    marginHorizontal: 16,
    marginVertical: 10,
    padding: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 2,
  },
  textBlock: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#222',
    marginBottom: 6,
  },
  taskDesc: {
    fontSize: 15,
    color: '#555',
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  taskMeta: {
    fontSize: 13,
    color: '#999',
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  restoreBtnSmall: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#43a047',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  deleteBtnSmall: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e53935',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  restoreTextSmall: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 4,
    fontSize: 13,
  },
  deleteTextSmall: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 4,
    fontSize: 13,
  },
});
