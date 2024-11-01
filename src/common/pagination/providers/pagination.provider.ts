import { Injectable, Inject } from '@nestjs/common';
import { PaginationQueryDto } from '../dtos/pagination-query.dto';
import { ObjectLiteral, Repository } from 'typeorm';

// inorder to inject a request to a provider
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import { Paginated } from '../interfaces/paginated.interface';

/**
 * provider for pagination
 */
@Injectable()
export class PaginationProvider {
  /**
   * constructor
   * @param request
   */
  constructor(
    /**
     * Injecting request
     */
    @Inject(REQUEST)
    private readonly request: Request,
  ) {}

  /**
   * function for paginating find all queries
   * @param paginationQuery
   * @param repository
   * @param options
   * @returns data, metadata and links for the findAll queries
   */
  public async paginationQuery<T extends ObjectLiteral>(
    paginationQuery: PaginationQueryDto,
    repository: Repository<T>,
    options?: any,
  ): Promise<Paginated<T>> {
    const results = await repository.find({
      // no of posts to skip in one query
      skip: (paginationQuery.page - 1) * paginationQuery.limit,
      // the no of posts to take in one query
      take: paginationQuery.limit,
      relations: options.relations,
      select: options.select,
      where: options.where,
    });

    /**
     * Create the request URLS
     */
    const baseURL =
      this.request.protocol + '://' + this.request.headers.host + '/';

    const newUrl = new URL(this.request.url, baseURL);

    // console.log(newUrl);

    const totalItems = await repository.count();
    const totalPages = Math.ceil(totalItems / paginationQuery.limit);
    const nextPage =
      paginationQuery.page === totalPages
        ? paginationQuery.page
        : paginationQuery.page + 1;
    const prevPage =
      paginationQuery.page === 1
        ? paginationQuery.page
        : paginationQuery.page - 1;

    const finalResponse: Paginated<T> = {
      data: results,
      meta: {
        itemsPerPage: paginationQuery.limit,
        totalItems: totalItems,
        currentPage: paginationQuery.page,
        totalPages: totalPages,
      },
      links: {
        first: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQuery.limit}&page=1`,
        last: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQuery.limit}&page=${totalPages}`,
        current: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQuery.limit}&page=${paginationQuery.page}`,
        next: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQuery.limit}&page=${nextPage}`,
        previous: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQuery.limit}&page=${prevPage}`,
      },
    };

    return finalResponse;
  }
}
