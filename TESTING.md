# Testing Guide

Bu proje Jest ve React Native Testing Library kullanarak kapsamlı testler içerir.

## Test Komutları

### Temel Test Komutları

```bash
# Tüm testleri çalıştır
npm test

# Testleri watch modunda çalıştır (geliştirme sırasında)
npm run test:watch

# Coverage raporu ile testleri çalıştır
npm run test:coverage

# CI/CD için testleri çalıştır
npm run test:ci
```

### Kategorik Test Komutları

```bash
# Sadece utility ve constants testleri
npm run test:unit

# Sadece component testleri
npm run test:components

# Sadece screen testleri
npm run test:screens

# Sadece Redux store testleri
npm run test:store
```

## Test Yapısı

```
src/
components/_tests_       # Component testleri
constants/_tests_         # Constants testleri
screens/_tests_          # Screen testleri
store/slices/_tests_      # Redux slice testleri
utils/_tests_         # Utility function testleri
test/setup.ts            # Jest setup dosyası
 helpers/testUtils.tsx   # Test yardımcı fonksiyonları


## Test Kategorileri

### 1. Unit Tests (Birim Testler)
- **URL Utils**: URL validation, normalization ve external URL açma
- **API Constants**: API endpoint'leri ve konfigürasyon sabitleri

### 2. Component Tests (Bileşen Testleri)
- **PremiumBanner**: Premium banner bileşeni testleri
- **SearchHeader**: Arama başlığı bileşeni testleri
- **CategoryCard**: Kategori kartı bileşeni testleri
- **QuestionCard**: Soru kartı bileşeni testleri

### 3. Screen Tests (Ekran Testleri)
- **HomePage**: Ana sayfa ekranı testleri
- **Onboarding**: Onboarding ekranı testleri

### 4. Redux Tests (State Management Testleri)
- **Categories Slice**: Kategori state yönetimi testleri
- **Questions Slice**: Soru state yönetimi testleri

## Test Prensipleri

### 1. AAA Pattern (Arrange, Act, Assert)
typescript
it('should validate URL correctly', () => {
  // Arrange
  const validUrl = 'https://example.com';
  
  // Act
  const result = isValidUrl(validUrl);
  
  // Assert
  expect(result).toBe(true);
});


### 2. Test Isolation
Her test birbirinden bağımsız çalışır ve `beforeEach` ile temizlenir.

### 3. Mock Strategy
- React Native modülleri mock'lanır
- External dependencies mock'lanır
- API çağrıları mock'lanır

### 4. Error Handling Tests
Her fonksiyon için error case'ler test edilir.

### 5. Edge Cases
Boundary değerler ve edge case'ler test edilir.

## Coverage Hedefleri

- **Statements**: %80+
- **Branches**: %80+
- **Functions**: %80+
- **Lines**: %80+

## Test Best Practices

### 1. Descripti ve Test Names
```typescript
İyi
it('should return true for valid HTTPS URLs')

Kötü
it('should work')


### 2. Test Organization
```typescript
describe('Component Name', () => {
  describe('Rendering', () => {
    // Rendering testleri
  });
  
  describe('Interactions', () => {
    // User interaction testleri
  });
  
  describe('Error Handling', () => {
    // Error case testleri
  });
});
```

### 3. Mock Data Factories
```typescript
export const createMockCategory = (overrides = {}) => ({
  id: 1,
  title: 'Test Category',
  ...overrides,
});
```

### 4. Async Testing
```typescript
it('should handle async operations', async () => {
  await waitFor(() => {
    expect(mockFunction).toHaveBeenCalled();
  });
});
```

## Debugging Tests

### 1. Debug Specific Test
```bash
npm test -- --testNamePattern="should validate URL"
```

### 2. Debug Test File
```bash
npm test src/utils/__tests__/urlUtils.test.ts
```

### 3. Verbose Output
```bash
npm test -- --verbose
```

## CI/CD Integration

Tests are configured to run in CI/CD pipelines with:
- Coverage reporting
- JUnit XML output
- Fail on coverage threshold

```bash
npm run test:ci
```

## Troubleshooting

### Common Issues

1. **Mock Issues**: Ensure all React Native modules are properly mocked in `setup.ts`
2. **Async Issues**: Use `waitFor` for async operations
3. **Component Issues**: Use proper test utilities and mock components when needed

### Debug Commands

```bash
# Clear Jest cache
npx jest --clearCache

# Run tests with debug info
npm test -- --verbose --no-cache
