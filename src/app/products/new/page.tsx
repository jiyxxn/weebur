'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import FormList from '@/app/components/FormList';
import FormLabel from '@/app/components/FormLabel';
import FormErrorMessage from '@/app/components/FormErrorMessage';
import { useAddProduct } from '@/hooks/useProducts';

const Schema = z.object({
  title: z
    .string()
    .nonempty({ message: '필수 입력 사항입니다' })
    .min(1, { message: '1~15자 사이로 입력해 주세요' })
    .max(15, { message: '1~15자 사이로 입력해 주세요' }),
  description: z.string().optional(),
  price: z
    .number({ message: '필수 입력 사항입니다' })
    .min(1000, { message: '1000 이상의 숫자만 입력해 주세요' }),
  discountPercentage: z
    .number({ message: '필수 입력 사항입니다' })
    .max(100, { message: '100 이하의 숫자만 입력해 주세요' })
    .optional(),
  brand: z.enum(['Apple', 'Samsung', 'Weebur']),
});

type FormValues = z.infer<typeof Schema>;

const NewProductPage = () => {
  const router = useRouter();
  const { mutate: addProduct, isPending } = useAddProduct();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(Schema),
    defaultValues: { brand: 'Apple' },
  });

  const price = watch('price') || 0;
  const discount = watch('discountPercentage') || 0;
  const finalPrice = Math.round(price * (1 - discount / 100));

  const onSubmit = async (values: FormValues) => {
    addProduct(values, {
      onSuccess: () => {
        alert('상품을 등록했습니다.');
        router.replace('/products');
      },
      onError: (error) => {
        alert('상품 등록에 실패했습니다.');
        console.error(error);
      },
    });
  };

  return (
    <section className="p-20">
      <h2 className="text-center text-xl mb-4">상품 등록하기</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 max-w-md mx-auto">
        <ul className="flex flex-col gap-4">
          <FormList>
            <FormLabel>
              상품명
              <div className="flex-1">
                <input
                  {...register('title')}
                  placeholder="15자 이내로 입력해 주세요"
                  className="w-full"
                />
                {errors.title && (
                  <FormErrorMessage>{errors.title.message}</FormErrorMessage>
                )}
              </div>
            </FormLabel>
          </FormList>
          <FormList>
            <FormLabel>
              상품 설명
              <textarea
                {...register('description')}
                placeholder="상품 설명을 입력해 주세요"
                className="flex-1"
              />
            </FormLabel>
          </FormList>
          <FormList>
            <FormLabel>
              가격
              <div className="flex-1">
                <input
                  type="number"
                  {...register('price', { valueAsNumber: true })}
                  placeholder="1000 이상으로 입력해 주세요"
                  className="w-full"
                />
                {errors.price && (
                  <FormErrorMessage>{errors.price.message}</FormErrorMessage>
                )}
              </div>
            </FormLabel>
          </FormList>
          <FormList>
            <FormLabel>
              할인율(%)
              <div>
                <input
                  type="number"
                  {...register('discountPercentage', { valueAsNumber: true })}
                  placeholder="100 이하로 입력해 주세요"
                />
                {errors.discountPercentage && (
                  <FormErrorMessage>
                    {errors.discountPercentage.message}
                  </FormErrorMessage>
                )}
              </div>
            </FormLabel>
          </FormList>
          <FormList>
            <FormLabel>
              브랜드
              <select {...register('brand')}>
                <option value="Apple">Apple</option>
                <option value="Samsung">Samsung</option>
                <option value="Weebur">Weebur</option>
              </select>
            </FormLabel>
          </FormList>
        </ul>

        <span className="flex items-center justify-center gap-2 bg-gray-50 rounded-lg p-4">
          예상 최종가: <strong>{finalPrice.toLocaleString()} 원</strong>
        </span>

        <button
          type="submit"
          disabled={isPending}
          className="p-2 bg-gray-900 w-full text-white rounded-lg disabled:bg-gray-400">
          {isPending ? '등록 중...' : '상품 등록'}
        </button>
      </form>
    </section>
  );
};

export default NewProductPage;
